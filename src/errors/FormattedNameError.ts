export default class FormattedNameError extends Error {
  constructor(message?: string) {
    super(
      `error encounter when dealing with formatted names ${
        message && `: ${message}`
      }`
    );
  }
}
