import UserDisplayableException from "@business/UserDisplayableException";

export default class BusinessRuleException extends UserDisplayableException {
  constructor(message: string) {
    super(message);
    this.name = "BusinessRuleException";
  }
}
