export class UserDisplayableException extends Error {
  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "UserDisplayableException";
    this.cause = cause;
  }
}

export class BusinessRuleException extends UserDisplayableException {
  constructor(message: string) {
    super(message);
    this.name = "BusinessRuleException";
  }
}

export class InvalidRequestException extends UserDisplayableException {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRequestException";
  }
}
