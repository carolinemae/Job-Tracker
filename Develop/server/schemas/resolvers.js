const { AuthenticationError } = require('apollo-server-express');
const { Project, Equipment, Employee, Timesheet } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    projects: async () => {
      return Project.find();
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },
    equipment: async () => {
      return Equipment.find();
    },
    employees: async () => {
      return Employee.find().populate('timesheets');
    },
    employee: async (parent, { employeeId }) => {
      return Employee.findOne({ _id: employeeId }).populate('timesheets');
    },
    timesheets: async () => {
      return Timesheet.find().sort({ date: -1 });
    },
    timesheet: async (parent, { timesheetId }) => {
      return Timesheet.findOne({ _id: timesheetId });
    },
    me: async (parent, args, context) => {
      if (context.employee) {
        return Employee.findOne({ _id: context.employee._id }).populate('timesheets');
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addEmployee: async (parent, { firstName, lastName, email, password }) => {
      const employee = await Employee.create({ firstName, lastName, email, password });
      const token = signToken(employee);
      return { token, employee };
    },
    createProject: async (parent, { projectName, location, description }, context) => {
      if (context.employee.admin) {
        const project = await Project.create({ projectName, location, description });
        return project;
      };
    },
    addEquipment: async (parent, { equipId, equipName }, context) => {
      if (context.employee.admin) {
        const equipment = await Equipment.create({ equipId, equipName });
        return equipment;
      };
    },
    addTimesheet: async (parent, { date, startTime, endTime, project }, context) => {
      if (context.employee) {
        const timesheet = await Timesheet.create(
          { 
            date, 
            startTime, 
            endTime, 
            project,
            employee: context.employee.firstName,
            // tasks: 
            //   {
            //     equipId,
            //     taskDesc,
            //   }
          }
        );

        await Employee.findOneAndUpdate(
          { _id: context.employee._id },
          { $addToSet: { timesheets: timesheet._id } }
        );

        // await Project.findOneAndUpdate(
        //   { _id: context.employee._id },
        //   { $addToSet: { timesheets: timesheet._id } }
        // );

        return timesheet;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateTimesheet: async (parent, { timesheetId, date, startTime, endTime, project }, context) => {
      if (context.employee) {
        return Timesheet.findOneAndUpdate(
          { _id: timesheetId },
          { $set: { date, startTime, endTime, project } },
          // { new: true, runValidators: true, }
        );
      }
      // throw new AuthenticationError('You need to be logged in!');
    },
    removeTimesheet: async (parent, { timesheetId }) => {
      return Timesheet.findOneAndDelete({ _id: timesheetId });
    },
    addTask: async (parent, { timesheetId, equipId, taskDesc }) => {
        return Timesheet.findOneAndUpdate(
          { _id: timesheetId },
          { $addToSet: { tasks: { equipId, taskDesc } } },
          { new: true, runValidators: true, }
        );
    },
    // toggleApproved: async (parent, { timesheetId }, context) => {
    //   if (context.employee) {
    //     return Timesheet.findOneAndUpdate(
    //       { _id: timesheetId },
    //       { approved: true }
    //     );
    //   }
    // },
    login: async (parent, { email, password }) => {
      const employee = await Employee.findOne({ email });

      if (!employee) {
        throw new AuthenticationError('No employee found with this email address');
      }

      const correctPw = await employee.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(employee);

      return { token, employee };
    },
  },
};

module.exports = resolvers;
