/* eslint-disable react-hooks/exhaustive-deps */
import { useMyContext } from "../../context/MyContext";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Header.css";

export default function Header() {
  const { setDataOnLocalStorage } = useMyContext();

  const showCategories = () => {
    const list = document.querySelector(".listNavbar");
    window.innerWidth < 900
      ? list?.classList.toggle("opened")
      : list?.classList.remove("opened");
  };

  return (
    <div className="header">
      <div className="headerContent">
        <h2 className="logo" onClick={() => setDataOnLocalStorage("general")}>
          Brazil News
        </h2>
        <ul className="listNavbar">
          <li
            className="itemNavbar"
            onClick={() => {
              setDataOnLocalStorage("general");
              showCategories();
            }}
          >
            Geral
          </li>
          <li
            className="itemNavbar"
            onClick={() => {
              setDataOnLocalStorage("world");
              showCategories();
            }}
          >
            Mundo
          </li>
          <li
            className="itemNavbar"
            onClick={() => {
              setDataOnLocalStorage("nation");
              showCategories();
            }}
          >
            Brasil
          </li>
          <li
            className="itemNavbar"
            onClick={() => {
              setDataOnLocalStorage("business");
              showCategories();
            }}
          >
            Negócios
          </li>
          <li
            className="itemNavbar"
            onClick={() => {
              setDataOnLocalStorage("technology");
              showCategories();
            }}
          >
            Tecnologia
          </li>
          <li
            className="itemNavbar"
            onClick={() => {
              setDataOnLocalStorage("entertainment");
              showCategories();
            }}
          >
            Entretenimento
          </li>
          <li
            className="itemNavbar"
            onClick={() => {
              setDataOnLocalStorage("sports");
              showCategories();
            }}
          >
            Esporte
          </li>
          <li
            className="itemNavbar"
            onClick={() => {
              setDataOnLocalStorage("science");
              showCategories();
            }}
          >
            Ciência
          </li>
          <li
            className="itemNavbar"
            onClick={() => {
              setDataOnLocalStorage("health");
              showCategories();
            }}
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
