import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "../api/api";

export default function Book() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const booksDetails = await fetchBookDetails(id, controller.signal);
        setData(booksDetails);
        if (booksDetails) {
          setData(booksDetails);
          console.log(booksDetails);
        } else {
          setData([]);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            "Erro ao buscar o livro. " +
              (error.response?.data?.error?.message || error.message)
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [id]);

  return (
    <div className="container">
      <div className="card mt-3 align-items-center d-flex justify-content-center">
        <div className="card-title">{data.title}</div>
        {/* <div className="card-body"><img src={data.imageLinks.thumbnail} alt=""/></div> */}

        <div className="card-body">{data.description}</div>
        <div className="card-body">{data.authors}</div>
        <div className="d-flex flex-row">
            <i className="fa-regular fa-star fa-2x"></i>
            <i className="fa-regular fa-star fa-2x"></i>
            <i className="fa-regular fa-star fa-2x"></i>
            <i className="fa-solid fa-star fa-2x"></i>
            <i className="fa-regular fa-star fa-2x"></i>
        </div>
      </div>
    </div>
  );
}
