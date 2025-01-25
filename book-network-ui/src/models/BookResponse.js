class BookResponse {
  #id;
  #title;
  #authorName;
  #isbn;
  #synopsis;
  #owner;
  #rate;
  #archived;
  #shareable;
  #isBookInWishlist;

  constructor(
    id,
    title,
    authorName,
    isbn,
    synopsis,
    owner,
    rate,
    archived,
    shareable,
    isBookInWishlist
  ) {
    this.#id = id;
    this.#title = title;
    this.#authorName = authorName;
    this.#isbn = isbn;
    this.#synopsis = synopsis;
    this.#owner = owner;
    this.#rate = rate;
    this.#archived = archived;
    this.#shareable = shareable;
    this.#isBookInWishlist = isBookInWishlist;
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

  get isbn() {
    return this.#isbn;
  }

  get synopsis() {
    return this.#synopsis;
  }

  get owner() {
    return this.#owner;
  }

  get rate() {
    return this.#rate;
  }

  get archived() {
    return this.#archived;
  }

  get shareable() {
    return this.#shareable;
  }

  get isBookInWishlist() {
    return this.#isBookInWishlist;
  }
}

export default BookResponse;
