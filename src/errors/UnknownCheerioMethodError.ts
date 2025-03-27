export default class UnknownCheerioMethodError extends Error {
  constructor(message?: string) {
    super(
      `an unknown method has been encounter during cheerio parsing to json ${
        message && `: ${message}`
      }`
    );
  }
}
