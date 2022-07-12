import { Context } from './context';

export const dataLoader = async (ctx: Context, event: unknown) => {
  // we could just do a
  // const result = await fetch('')
  // const {data} = await result.json();

  console.log('current retry', ctx.retries);
  if (ctx.retries === 2) {
    return {
      foo: 'bar',
    };
  }

  throw new Error('something went wrong while loading the data');
};
