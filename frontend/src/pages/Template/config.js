import color from '@/utils/color';

export const fields = {
  name: {
    type: 'stringWithColor',
    required: true,
  },
  group: {
    type: 'textarea',
  },
  goal: {
    type: 'textarea',
    required: true,
  },
  promptOutput: {
    type: 'textarea',
  },
  enabled: {
    type: 'boolean',
  },
};
