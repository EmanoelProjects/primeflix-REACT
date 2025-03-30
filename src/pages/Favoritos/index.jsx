import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./favoritos.css";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavoritos(JSON.parse(localStorage.getItem("@primeFlix")) || []);
  }, []);

  function excluir(id) {
    const newFilmes = favoritos.filter((filmes) => filmes.id != id);

    localStorage.setItem("@primeFlix", JSON.stringify(newFilmes));
    setFavoritos(newFilmes);
  }

  return (
    <div className="favoritos-container">
      <ul>
        {favoritos.map((filme) => {
          return (
            <li key={filme.id}>
              <h3> {filme.title}</h3>
              <div>
                <button onClick={() => excluir(filme.id)}>Excluir</button>
                <button onClick={() => navigate(`/Filme/${filme.id}`)}>
                  Detalhes
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
