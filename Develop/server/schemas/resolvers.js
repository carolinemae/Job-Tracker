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
    employee: async (parent, { employee }) => {
      return Employee.findOne({ employee }).populate('timesheets');
    },
    timesheets: async (parent, { employee }) => {
      const params = employee ? { employee } : {};
      return Timesheet.find(params);
    },
    // timesheet: async (parent, { _id }) => {
    //   return Timesheet.findById(_id).populate('employee');
    // },
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
      console.log(context.employee);
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
    addTimesheet: async (parent, { date, startTime, endTime }, context) => {
      console.log(context.employee);
      if (context.employee) {
        const timesheet = await Timesheet.create(
          { 
            date, 
            startTime, 
            endTime, 
            employee: context.employee.firstName 
          }
        );
        console.log(timesheet);

        await Employee.findOneAndUpdate(
          { _id: context.employee._id },
          { $addToSet: { timesheets: timesheet._id } }
        )
        return timesheet;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // addTimesheet: async (parent, { date, startTime, lunchStart, lunchEnd, endTime }, context) => {
    //   if (context.employee) {
    //     const timesheet = await Timesheet.create({
    //       date, 
    //       startTime, 
    //       lunchStart, 
    //       lunchEnd, 
    //       endTime,
    //       employee: context.employee.firstName,
    //     });

    //     await Employee.findOneAndUpdate(
    //       { _id: context.employee._id },
    //       { $addToSet: { timesheets: timesheet._id } }
    //     );

    //     return timesheet;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
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
