const { AuthenticationError } = require('apollo-server-express');
const { Project, Equipment, Employee, Timesheet } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    projects: async () => {
      return Project.find().populate('timesheets');
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId }).populate({ path: 'timesheets', options: { sort: { 'date': -1 } } });
    },
    equipment: async () => {
      return Equipment.find();
    },
    employees: async () => {
      return Employee.find().populate('timesheets');
    },
    employee: async (parent, { employeeId }) => {
      return Employee.findOne({ _id: employeeId }).populate({ path: 'timesheets', options: { sort: { 'date': -1 } } });
    },
    timesheets: async () => {
      return Timesheet.find().sort({ date: -1 });
    },
    timesheet: async (parent, { timesheetId }) => {
      return Timesheet.findOne({ _id: timesheetId });
    },
  },

  Mutation: {
    addEmployee: async (parent, { firstName, lastName, email, password }) => {
      const employee = await Employee.create({ firstName, lastName, email, password });
      const token = signToken(employee);
      return { token, employee };
    },
    updateEmployee: async (parent, { employeeId, phone, street, city, postcode, emergencyName, emergencyPhone }, context) => {
      if (context.employee) {
        // if (phone) { await Employee.findOneAndUpdate({ _id: employeeId }, { $set: { phone } }) };
        // if (street) { await Employee.findOneAndUpdate({ _id: employeeId }, { $set: { address: { street } } }) };
        // if (city) { await Employee.findOneAndUpdate({ _id: employeeId }, { $set: { address: { city } } }) };
        // if (emergencyName) { await Employee.findOneAndUpdate({ _id: employeeId }, { $set: { emergencyContact: { emergencyName } } }) };
        // if (emergencyPhone) { await Employee.findOneAndUpdate({ _id: employeeId }, { $set: { emergencyContact: { emergencyPhone } } }) };

        return Employee.findOneAndUpdate(
          { _id: employeeId },
          { $set: { phone, address: { street, city, postcode }, emergencyContact: { emergencyName, emergencyPhone } } }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
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
            employee: context.employee.firstName + ' ' + context.employee.lastName,
          }
        );

        await Employee.findOneAndUpdate(
          { _id: context.employee._id },
          { $addToSet: { timesheets: timesheet._id } }
        );

        await Project.findOneAndUpdate(
          { projectName: project },
          { $addToSet: { timesheets: timesheet._id } },
          { new: true, runValidators: true, }
        );

        return timesheet;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateTimesheet: async (parent, { timesheetId, date, startTime, endTime, project }, context) => {
      if (context.employee) {
        await Timesheet.findOneAndUpdate(
          { _id: timesheetId },
          { $set: { date, startTime, endTime, project } },
        );

        await Project.findOneAndUpdate(
          { projectName: project },
          { $addToSet: { timesheets: timesheetId } },
          { new: true, runValidators: true, }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteTimesheet: async (parent, { timesheetId }) => {
      return Timesheet.findOneAndDelete({ _id: timesheetId });
    },
    addTask: async (parent, { timesheetId, equipId, taskDesc, project }, context) => {
      if (context.employee) {
        return Timesheet.findOneAndUpdate(
          { _id: timesheetId },
          { $addToSet: { tasks: { equipId, taskDesc } } },
          { new: true, runValidators: true, }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    toggleApproved: async (parent, { timesheetId, approved }, context) => {
      if (context.employee.admin) {
        return Timesheet.findOneAndUpdate(
          { _id: timesheetId },
          { $set: { approved: approved } }
        );
      }
    },
    toggleAdmin: async (parent, { employeeId, admin }, context) => {
      if (context.employee.admin) {
        return Employee.findOneAndUpdate(
          { _id: employeeId },
          { $set: { admin: admin } }
        );
      }
    },
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
