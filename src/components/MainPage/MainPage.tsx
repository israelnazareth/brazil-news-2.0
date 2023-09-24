/* eslint-disable react-hooks/exhaustive-deps */
import { useMyContext } from "../../context/MyContext";
import Cards from "../Cards/Cards";
import "./MainPage.css";

export default function Headlines() {
  const { title, loading } = useMyContext();

  return (
    <div>
      {loading ? (
        <h1 className="loading">Carregando...</h1>
      ) : (
        <div>
          <h1 className="newsType" id="home">
            {title}
          </h1>
          <div className="main">
            <Cards />
          </div>
        </div>
      )}
    </div>
  );
}
