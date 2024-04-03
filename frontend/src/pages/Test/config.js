import color from '@/utils/color';

export const fields = {
  testCode: {
    type: 'stringWithColor',
    required: true,
  },
  description: {
    type: 'textarea',
  },
  topic: {
    type: 'string',
  },
  enabled: {
    type: 'boolean',
  },
};
