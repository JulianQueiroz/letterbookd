import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY as string;

export const fetchBooks = async (query: string, signal: AbortSignal) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=${apiKey}`,
      { signal }
    );
    return response.data.items || [];
  } catch (error) {
    throw error;
  }
};

export const fetchBookDetails = async (id: string, signal: AbortSignal) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`,
      { signal }
    );
    return response.data.volumeInfo;
  } catch (error) {
    throw error;
  }
};
