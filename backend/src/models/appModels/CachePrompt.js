const mongoose = require('mongoose');

const cachePromptSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

  template: {
    type: mongoose.Schema.ObjectId,
    ref: 'Template',
    autopopulate: true,
  },

  cacheConditions: [{
    key: String,
    changeDetection: String,
  }],
  initPrompt: {
    type: String,
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },

  created: {
    type: Date,
    default: Date.now,
  },
  expired: {
    type: Date,
    required: true,
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
    // required: true,
  }
});

cachePromptSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('CachePrompt', cachePromptSchema);
