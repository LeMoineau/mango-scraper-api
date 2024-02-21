export default class MangoApiConfigError extends Error {
  constructor(message?: string) {
    super(
      `error encounter when parsing scrapers-config ${
        message && `: ${message}`
      }`
    );
  }
}
