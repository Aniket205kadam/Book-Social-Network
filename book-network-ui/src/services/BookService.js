import AppConfig from "../config/AppConfig";

class BookService {
  baseUrl = `${AppConfig.api_url}/api/v1/books`;

  getAllBooks = async (token, currPage, size) => {
    const apiUrl = `${this.baseUrl}?page=${currPage}&size=${size}`
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Not Found!");
    }
    return response.json();
  };

  getBookCover = async (bookId, token) => {
    const apiUrl = `${this.baseUrl}/cover/${bookId}`;
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.blob();
  }

  getBookById = async (bookId, token) => {
    const apiUrl = `${this.baseUrl}/${bookId}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }

  getMyBooks = async (token, currPage, size) => {
    const apiUrl = `${this.baseUrl}/owner?page=${currPage}&size=${size}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }

  getBorrowedBooks = async (token, currPage, size) => {
    const apiUrl = `${this.baseUrl}/borrowed?page=${currPage}&size=${size}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  }

  toggleShareable = async (bookId, token) => {
    const apiUrl = `${this.baseUrl}/shareable/${bookId}`;
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.text();
  }

  toggleArchived = async (bookId, token) => {
    const apiUrl = `${this.baseUrl}/archived/${bookId}`;
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.text();
  }

  borrowBook = async (bookId, token) => {
    const apiUrl = `${this.baseUrl}/borrow/${bookId}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${error.error}`);
    }
    return response.text();
  }

  returnBorrowBook = async (bookId, token) => {
    const apiUrl = `${this.baseUrl}/borrow/return/${bookId}`;
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${error.error}`);
    }
    return response.text();
  }

  findAllReturnedBooks = async (token, currPage, size) => {
    const apiUrl = `${this.baseUrl}/returned?page=${currPage}&size=${size}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${error.error}`);
    }
    return response.json();
  }

  approveReturnBorrowBook = async (bookId, token) => {
    const apiUrl = `${this.baseUrl}/borrow/return/approve/${bookId}`;
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${error.error}`);
    }
    return response.text();
  }

  uploadBook = async (data, token) => {
    console.log("data: ", data);
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        authorName: data.author,
        isbn: data.isbn,
        synopsis: data.synopsis,
        shareable: data.shareable
      })
    });
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error(`${error.error}`);
    }
    return response.text();
  }

  uploadImage = async (bookId, file, token) => {
    console.log(token);
    console.log("bookId: ", bookId);
    const apiUrl = `${this.baseUrl}/cover/${bookId}`;
    console.log("apiUrl: ", apiUrl);
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${error.error}`);
    }
    return response.status;
  }

  getWishedBooks = async (token) => {
    const apiUrl = `${AppConfig.api_url}/api/v1/users/wish-list`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${error.error}`);
    }
    return response.json();
  }

  addToWishList = async (token, bookId) => {
    const apiUrl = `${AppConfig.api_url}/api/v1/users/wish-list/${bookId}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${error.error}`);
    }
    return response.text();
  }

  toggleWishListIcon  = async (token, bookId) => {
    const apiUrl = `${AppConfig.api_url}/api/v1/users/books/wish-list/${bookId}`;
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${error.error}`);
    }
    return response.text();
  }
}

export default new BookService();
