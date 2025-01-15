export class ConstraintError extends Error {
  status: number;
  constructor(message: string, status: number = 400) {
    super(message);
    this.name = "ConstraintError";
    this.status = status;
  }
}