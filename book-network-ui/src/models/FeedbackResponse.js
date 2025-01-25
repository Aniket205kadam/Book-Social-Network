class FeedbackResponse {
    #username;
    #note;
    #comment;
    #ownFeedback;

    constructor(username, note, comment, ownFeedback) {
        this.#username = username;
        this.#note = note;
        this.#comment = comment;
        this.#ownFeedback = ownFeedback;
    }

    get username() {
        return this.#username;
    }

    get note() {
        return this.#note;
    }

    get comment() {
        return this.#comment;
    }

    get ownFeedback() {
        return this.#ownFeedback;
    }
}

export default FeedbackResponse;