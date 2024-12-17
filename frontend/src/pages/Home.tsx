import axios, { AxiosError } from 'axios';
import SearchBar from '../components/SearchBar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../api/api';

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
  };
}

export default function Home() {
  const [query, setQuery] = useState<string>(''); 
  const [data, setData] = useState<Book[]>([]);  
  const [loading, setLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const books = await fetchBooks(query, controller.signal)
        setData(books)
        if (books) {
          setData(books);
          
        } else {
          setData([]);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
            setError('Erro ao buscar os livros. ' + (error.response?.data?.error?.message || error.message));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [query]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Letterbook</h1>

      <SearchBar query={query} onChange={setQuery} />

      {loading && <p>Carregando...</p>}

      {error && <p>{error}</p>}

      <div>
            {data.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }} >
                {data.map((book) => (
                    <Link to={`/book/${book.id}`} key={book.id} style={{color:'inherit',textDecoration:'none'}}>
                <li
                    style={{
                    border: '1px solid #ddd',
                    marginBottom: '10px',
                    padding: '10px',
                    borderRadius: '5px',
                    }}
                >
                    <strong>{book.volumeInfo.title}</strong>
                    <p>Autor(es): {book.volumeInfo.authors?.join(', ') || 'Desconhecido'}</p>
                    <p>{book.volumeInfo.publishedDate}</p>
                </li>
                </Link>
                ))}
            </ul>
            ) : query && !loading ? (
            <p>Nenhum resultado encontrado.</p>
            ) : null}
      </div>
    </div>
  );
}
