import { assign, createMachine } from 'xstate';
import { Context, Events, initialContext } from './context';
import { dataLoader } from './services';

export const machine = createMachine<Context, Events>(
  {
    initial: 'idle',
    context: initialContext,
    states: {
      idle: {
        // assign initial context through reset action
        entry: assign(initialContext),
        on: {
          load: 'loading',
        },
      },
      loading: {
        invoke: {
          src: 'dataLoader',
          onDone: {
            target: 'success',
            actions: assign({ data: (ctx, event) => event.data }),
          },
          onError: {
            target: 'error',
            actions: assign({
              retries: (ctx) => ctx.retries + 1,
            }),
          },
        },
      },
      error: {
        after: {
          1000: 'loading',
        },
      },
      success: {
        on: {
          reset: 'idle',
        },
      },
    },
  },
  {
    services: {
      dataLoader,
    },
  }
);
