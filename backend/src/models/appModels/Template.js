const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
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
  topic: {
    type: mongoose.Schema.ObjectId,
    ref: "Topic",
    autopopulate: true,
    required: true,
  },

  promptEnhancers: [{
    key: String,
    valueType: {
      type: String,
      enum: [
        'text',
        'float',
        'integer',
      ],
      default: 'text',
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    description: String,
    promptModifier: String,
  }],
  promptOutput: String,
  examples: {
    parserOutputExample: String,
    SampleResponse: String,
  },
  chatgptSettings: [{
    setting: {
      type: String,
      required: true,
    },
    valueType: {
      type: String,
      enum: [
        'text',
        'float',
        'integer',
      ],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    minValue: String,
    maxValue: String,
    description: String,
  }],

    useCache: {
      type: Boolean,
      required: true,
      default: false,
    },
    cacheTimeoutUnit: {
      type: String,
      enum: [
        'seconds',
        'minutes',
        'hours',
        'days',
        'weeks',
        'months',
        null,
      ],
      default: null,
    },
    cacheTimeoutValue: Number,
    cacheConditions: [{
      key: String,
      changeDetection: String,
    }],
    cacheDescription: String,

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
    // required: true,
  }
});

templateSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Template', templateSchema);
