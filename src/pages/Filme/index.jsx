import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

import "./filme.css";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: "",
            language: "pt-br",
          },
        })
        .then((response) => {
          setFilme(response.data);
        })
        .catch((erro) => {
          console.log("filme não encontrado", erro);
        });
      setLoading(false);
    }

    loadFilme();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  function salvarFilme(id) {
    const meuFilme = JSON.parse(localStorage.getItem("@primeFlix")) || [];

    const hasFilme = meuFilme.some((filme) => filme.id === id);

    if (hasFilme) {
      alert("Esse filme já está salvo");
      return;
    }

    alert("filme salvo!!");
    meuFilme.push(filme);

    localStorage.setItem("@primeFlix", JSON.stringify(meuFilme));
  }

  return (
    <div className="detalhes-container">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} />
      <strong>Sinopse</strong>
      <p>{filme.overview}</p>
      <strong>{`Avaliação ${filme.vote_average} / 10`}</strong>
      <div className="btns">
        <button onClick={() => salvarFilme(filme.id)}>Salvar</button>
        <button>
          <Link
            target="_blank"
            to={`https://www.youtube.com/results?search_query=${filme.title} trailer`}
          >
            Trailer
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Filme;
