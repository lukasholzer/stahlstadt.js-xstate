import { useMachine } from '@xstate/react';
import { FC, ReactNode, useMemo } from 'react';
import { machine } from './machine';
import './SimpleToggle.css';

type CollapsibleProps = {
  children?: ReactNode;
};

const Collapsible: FC<CollapsibleProps> = ({ children }) => {
  const [{ matches }, send] = useMachine(machine);
  return (
    <div className="collapsible" data-collapsed={matches('disabled')}>
      <button onClick={() => send('TOGGLE')}>
        {matches('enabled') ? 'Expand' : 'Collapse'}
      </button>
      <div className="collapsible-content">{children}</div>
    </div>
  );
};

export const SimpleToggle: FC = () => {
  const [{ value, matches }, send] = useMachine(machine, { devTools: true });

  const emoji = useMemo(() => (matches('enabled') ? '✅' : '⛔️'), [matches]);

  return (
    <div>
      <button onClick={() => send('TOGGLE')}>toggle</button>
      {emoji}
      <pre>{JSON.stringify(value, null, 2)}</pre>

      <Collapsible>
        <h3>Content 1</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
          eligendi error nesciunt fugiat magni autem nisi maiores amet adipisci
          modi sunt quibusdam placeat rem culpa illum excepturi sint,
          perferendis unde?
        </p>
      </Collapsible>

      <Collapsible>
        <h3>Content 2</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
          eligendi error nesciunt fugiat magni autem nisi maiores amet adipisci
          modi sunt quibusdam placeat rem culpa illum excepturi sint,
          perferendis unde?
        </p>
      </Collapsible>
    </div>
  );
};
