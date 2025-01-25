class FeedbackRequest {
  #id;
  #comment;
  #note;
  #bookId;

  constructor(id, comment, note, bookId) {
    this.#id = id;
    this.#comment = comment;
    this.#note = note;
    this.#bookId = bookId;
  }

  get id() {
    return this.#id;
  }

  get comment() {
    return this.#comment;
  }

  get note() {
    return this.#note;
  }

  get bookId() {
    return this.#bookId;
  }
}

export default FeedbackRequest;
