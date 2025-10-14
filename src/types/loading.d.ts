export const IDLE = 'IDLE';
export const PENDING = 'PENDING';
export const SUCCEEDED = 'SUCCEEDED';
export const FAILED = 'FAILED';

export type LoadingType = typeof IDLE | typeof PENDING | typeof SUCCEEDED | typeof FAILED;
