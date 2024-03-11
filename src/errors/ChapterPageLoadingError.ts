export default class ChapterPageLoadingError extends Error {
  constructor(message?: string) {
    super(
      `error encounter when loading chapter images ${message && `: ${message}`}`
    );
  }
}
