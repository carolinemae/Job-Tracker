const { Project, Equipment, Employee } = require('../models');

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
    }
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
