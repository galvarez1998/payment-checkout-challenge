export type Result<T> = Success<T> | Failure;

export class Success<T> {
  readonly isSuccess = true;
  readonly isFailure = false;

  constructor(public readonly value: T) {}
}

export class Failure {
  readonly isSuccess = false;
  readonly isFailure = true;

  constructor(public readonly error: string) {}
}

export const ok = <T>(value: T) => new Success(value);
export const fail = (error: string) => new Failure(error);
