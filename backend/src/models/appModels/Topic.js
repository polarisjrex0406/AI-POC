const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

  name: {
    type: String,
    required: true,
  },
  group: String,
  goal: String,
  topicPrompt: {
    type: String,
  },

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

topicSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Topic', topicSchema);
