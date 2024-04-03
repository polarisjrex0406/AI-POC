const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },

  experimentCode: {
    type: String,
    required: true,
  },
  description: String,
  style: {
    type: String,
    enum: ['Stand-alone','Conversation'],
    required: true,
  },
  initPrompt: {
    type: String
  },
  topic: {
    type: mongoose.Schema.ObjectId,
    ref: 'Topic',
    autopopulate: true,
  },
  templates: [{
    order: Number,
    templateCode: {
        type: mongoose.Schema.ObjectId,
        ref: 'Template',
        autopopulate: true,
    }
  }],
    ruleLogic: {
      type: String,
      enum: ['Any', 'All'],
    },
    rules: [{
      ruleName: String,
      conditionsLogic: {
        type: String,
        enum: ['Any', 'All'],
      },
      conditionName: String,
      conditionType: String,
      conditionItem: String,
      conditionOperator: {
        type: String,
        enum: ['EQ','NEQ','LT','LTE','GT','GTE','IN','NOTIN'],
      },
      conditionValue: String,
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

experimentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Experiment', experimentSchema);
