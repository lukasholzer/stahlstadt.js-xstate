import { test } from 'vitest';
import { interpret } from 'xstate';
import { machine } from './machine';

test('asdf', () => {
  const service = interpret(machine);
});
