export default class UserDisplayableException extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "UserDisplayableException";
    this.cause = cause;
  }
}
