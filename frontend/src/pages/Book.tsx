import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookDetails } from "../api/api";
import ModalReview from "../components/ModalReview";
import { Rating } from "@mui/material";

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
      <div className="d-flex justify-start">
        <button
          type="button"
          className="border-0 bg-transparent"
          onClick={() => window.history.back()}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
      <div className="card mt-3 align-items-center d-flex justify-content-center">
        <div className="card-title">{data.title}</div>
        {/* <div className="card-body"><img src={data.imageLinks.thumbnail} alt=""/></div> */}

        <div className="card-body">{data.description}</div>
        <div className="card-body">{data.authors}</div>
        <div className="d-flex flex-row">
            <Rating/>
        </div>
        <div className="d-flex w-100 justify-content-end">
          <button
            type="button"
            className="btn bg-transparent"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fa-solid fa-plus fa-2x"></i>
          </button>
        </div>
      </div>
      <ModalReview/>
      <hr className="w-100" />
      <h2 className="text-start">Avaliações:</h2>
      <div className="d-flex flex-row">
        <div style={{ marginRight: "1em" }}>
          <i className="fa-solid fa-user"></i>
        </div>
        <p className="text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          necessitatibus minus, tenetur, quae ducimus, ipsa fuga recusandae
          molestiae autem totam dicta possimus voluptas nihil eum laboriosam
          doloribus corrupti sed officiis!
        </p>
        <i className="fa-regular fa-heart"></i>
      </div>
      <div className="d-flex flex-row">
        <div style={{ marginRight: "1em" }}>
          <i className="fa-solid fa-user"></i>
        </div>
        <p className="text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          necessitatibus minus, tenetur, quae ducimus, ipsa fuga recusandae
          molestiae autem totam dicta possimus voluptas nihil eum laboriosam
          doloribus corrupti sed officiis!
        </p>
        <i className="fa-regular fa-heart"></i>
      </div>
      <div className="d-flex flex-row">
        <div style={{ marginRight: "1em" }}>
          <i className="fa-solid fa-user"></i>
        </div>
        <p className="text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          necessitatibus minus, tenetur, quae ducimus, ipsa fuga recusandae
          molestiae autem totam dicta possimus voluptas nihil eum laboriosam
          doloribus corrupti sed officiis!
        </p>
        <i className="fa-regular fa-heart"></i>
      </div>
      <div className="d-flex flex-row">
        <div style={{ marginRight: "1em" }}>
          <i className="fa-solid fa-user"></i>
        </div>
        <p className="text-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          necessitatibus minus, tenetur, quae ducimus, ipsa fuga recusandae
          molestiae autem totam dicta possimus voluptas nihil eum laboriosam
          doloribus corrupti sed officiis!
        </p>
        <i className="fa-regular fa-heart"></i>
      </div>
    </div>
  );
}
