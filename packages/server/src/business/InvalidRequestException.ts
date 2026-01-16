import UserDisplayableException from "@business/UserDisplayableException";

export default class InvalidRequestException extends UserDisplayableException {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRequestException";
  }
}
