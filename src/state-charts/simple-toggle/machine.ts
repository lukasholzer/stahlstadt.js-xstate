import { createMachine } from 'xstate';

export const machine = createMachine({
  id: 'Simple Toggle Machine',
  initial: 'disabled',
  states: {
    disabled: {
      on: { TOGGLE: 'enabled' },
    },
    enabled: {
      on: { TOGGLE: 'disabled' },
    },
  },
});
