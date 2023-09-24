/* eslint-disable react-hooks/exhaustive-deps */
import { useMyContext } from "../../context/MyContext";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Header.css";

export default function Header() {
  const { setDataOnLocalStorage } = useMyContext();

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const showCategories = () => {
    const list = document.querySelector(".listNavbar");
    window.innerWidth < 900
      ? list?.classList.toggle("opened")
      : list?.classList.remove("opened");
  };

  const setDataAndBackToTop = (category: string) => {
    setDataOnLocalStorage(category);
    showCategories();
    topFunction();
  };

  return (
    <div className="header">
      <div className="headerContent">
        <h2
          className="logo"
          onClick={() => {
            setDataOnLocalStorage("general");
            topFunction();
          }}
        >
          Brazil News
        </h2>
        <ul className="listNavbar">
          <li
            className="itemNavbar"
            onClick={() => setDataAndBackToTop("general")}
          >
            Geral
          </li>
          <li
            className="itemNavbar"
            onClick={() => setDataAndBackToTop("world")}
          >
            Mundo
          </li>
          <li
            className="itemNavbar"
            onClick={() => setDataAndBackToTop("nation")}
          >
            Brasil
          </li>
          <li
            className="itemNavbar"
            onClick={() => setDataAndBackToTop("business")}
          >
            Negócios
          </li>
          <li
            className="itemNavbar"
            onClick={() => setDataAndBackToTop("technology")}
          >
            Tecnologia
          </li>
          <li
            className="itemNavbar"
            onClick={() => setDataAndBackToTop("entertainment")}
          >
            Entretenimento
          </li>
          <li
            className="itemNavbar"
            onClick={() => setDataAndBackToTop("sports")}
          >
            Esporte
          </li>
          <li
            className="itemNavbar"
            onClick={() => setDataAndBackToTop("science")}
          >
            Ciência
          </li>
          <li
            className="itemNavbar"
            onClick={() => setDataAndBackToTop("health")}
          >
            Saúde
          </li>
        </ul>
        <GiHamburgerMenu
          className="menuIcon"
          onClick={() => showCategories()}
        />
      </div>
    </div>
  );
}
