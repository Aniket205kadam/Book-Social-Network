class FeedbackService {
    baseUrl="http://localhost:8088/api/v1/feedbacks";

    saveFeedback = async (feedbackRequest, token) => {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: feedbackRequest.comment,
                note: feedbackRequest.note,
                bookId: feedbackRequest.bookId
            })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Error is occured");
        }
        return response.text();
    }

    findAllFeedbackByBook = async (bookId, token) => {
        const apiUrl = `${this.baseUrl}/book/${bookId}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const error = response.json();
            throw new Error(error.error || "Error is occured");
        }
        return response.json();
    }
}

export default new FeedbackService();