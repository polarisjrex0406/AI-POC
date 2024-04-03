const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

  testCode: {
    type: String,
    required: true,
  },
  description: String,
  topic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Topic',
    autopopulate: true,
  },
  experiments: [{
    order: Number,
    experiment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Experiment',
      autopopulate: true,
    },
    chatHistory: [{
      input: [{
        role: {
          type: String,
          enum: [
            'system',
            'user',
            'assistant',
          ]
        },
        content: String
      }],
      output: {
        role: {
          type: String,
          enum: [
            'system',
            'user',
            'assistant',
          ]
        },
        content: String
      },
    }],
  }],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    required: true,
  }
});

testSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Test', testSchema);
