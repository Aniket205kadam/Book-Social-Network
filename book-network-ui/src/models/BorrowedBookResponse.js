class BorrowedBookResponse {
  #id;
  #title;
  #authorName;
  #returned;
  #returnApproved;

  constructor(id, title, authorName, returned, returnApproved) {
    this.#id = id;
    this.#title = title;
    this.#authorName = authorName;
    this.#returned = returned;
    this.#returnApproved = returnApproved;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get authorName() {
    return this.#authorName;
  }

  get returned() {
    return this.#returned;
  }

  get returnApproved() {
    return this.#returnApproved;
  }
}

export default BorrowedBookResponse;
