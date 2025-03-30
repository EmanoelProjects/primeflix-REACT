import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <Link to={"/"}>
        <h1>PrimeFlix</h1>
      </Link>
      <button>
        <Link to={"/favoritos"}>Meus Filmes</Link>
      </button>
    </header>
  );
}

export default Header;
