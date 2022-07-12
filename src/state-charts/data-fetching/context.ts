export type Context = {
  retries: number;
  data: null | object;
};

export const initialContext: Context = {
  retries: 0,
  data: null,
};

export type Events = { type: 'reset' } | { type: 'load' };
