import color from '@/utils/color';

export const fields = {
  experimentCode: {
    type: 'stringWithColor',
    required: true,
  },
  description: {
    type: 'textarea',
  },
  style: {
    type: 'string',
    enum: ['Stand-alone','Conversation'],
    required: true,
  },
  enabled: {
    type: 'boolean',
  },
};
