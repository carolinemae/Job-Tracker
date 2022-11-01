const { AuthenticationError } = require('apollo-server-express');
const { Project, Equipment, Employee } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    projects: async () => {
      return Project.find().sort({ createdAt: -1 });
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },
    equipment: async () => {
      return Equipment.find().sort({ equipId: asc });
    },
    employees: async () => {
      return Employee.find();
    },
  },

  Mutation: {
    addEmployee: async (parent, { firstName, lastName, email, password }) => {
      const employee = await Employee.create({ firstName, lastName, email, password });
      const token = signToken(employee);
      return { token, employee };
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

  // Mutation: {
  //   addThought: async (parent, { thoughtText, thoughtAuthor }) => {
  //     return Thought.create({ thoughtText, thoughtAuthor });
  //   },
  //   addComment: async (parent, { thoughtId, commentText }) => {
  //     return Thought.findOneAndUpdate(
  //       { _id: thoughtId },
  //       {
  //         $addToSet: { comments: { commentText } },
  //       },
  //       {
  //         new: true,
  //         runValidators: true,
  //       }
  //     );
  //   },
  //   removeThought: async (parent, { thoughtId }) => {
  //     return Thought.findOneAndDelete({ _id: thoughtId });
  //   },
  //   removeComment: async (parent, { thoughtId, commentId }) => {
  //     return Thought.findOneAndUpdate(
  //       { _id: thoughtId },
  //       { $pull: { comments: { _id: commentId } } },
  //       { new: true }
  //     );
  //   },
  // },
};

module.exports = resolvers;
