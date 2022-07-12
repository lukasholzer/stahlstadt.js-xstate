import { expect, test } from 'vitest';
import { interpret } from 'xstate';
import { machine } from './machine';

test('simple machine test', async () => {
  const service = interpret(
    machine.withConfig({
      services: {
        // provide a different dataloader to the machine for the testing purpose
        dataLoader: async () => ({ foo: 'inside test' }),
      },
    })
  );
  service.start();

  expect(service.state.matches('idle')).toBeTruthy();
  expect(service.state.context).toMatchInlineSnapshot(`
    {
      "data": null,
      "retries": 0,
    }
  `);

  service.send('load');
  expect(service.state.value).toBe('loading');

  // because the dataLoader is async we need to wait for the state success
  await new Promise<void>((res) =>
    service.onTransition(({ value }) => value === 'success' && res())
  );

  expect(service.state.value).toBe('success');
  // expect our mocked response
  expect(service.state.context).toMatchInlineSnapshot(`
    {
      "data": {
        "foo": "inside test",
      },
      "retries": 0,
    }
  `);
});
