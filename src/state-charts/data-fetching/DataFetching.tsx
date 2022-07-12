import { useInterpret, useMachine } from '@xstate/react';
import { FC } from 'react';
import { machine } from './machine';

export const DataFetching: FC = () => {
  const [{ context, value }, send] = useMachine(machine, { devTools: true });

  return (
    <div>
      <pre>{JSON.stringify({ value })}</pre>
      <button onClick={() => send('load')}>Load</button>
      <button onClick={() => send('reset')}>Reset</button>
      <pre>{JSON.stringify(context, null, 2)}</pre>
    </div>
  );
};
