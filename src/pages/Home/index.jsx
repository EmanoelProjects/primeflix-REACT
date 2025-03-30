import { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadingFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "",
          language: "pt-br",
        },
      });
      console.log(response);
      setFilmes(response.data.results.slice(0, 11));
      setLoading(false);
    }
    loadingFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      {filmes.map((filme) => {
        return (
          <div className="filme-container" key={filme.id}>
            <h2>{filme.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
            ></img>
            <Link to={`/filme/${filme.id}`}>Acessar</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
