/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useMyContext } from "../../context/MyContext";
import { fetchByCategory } from "../../services/fetchApi";
import { GiHamburgerMenu } from 'react-icons/gi'
import './Header.css'

export default function Header() {
  const { setArticles } = useMyContext()

  const getNewsByCategory = async (category = 'general', type = 'Geral') => {
    const articlesAPI = await fetchByCategory(category)
    const articles = {
      articles: articlesAPI,
      type
    }
    setArticles(articles)
  }

  const showCategories = () => {
    const list = document.querySelector('.listNavbar');
      window.innerWidth < 900 ? list?.classList.toggle('opened') : list?.classList.remove('opened')
  }

  useEffect(() => { getNewsByCategory() }, [])

  return (
    <div className="header">
      <div className="headerContent">
        <h2 className="logo" onClick={() => getNewsByCategory()}>Brazil News</h2>
        <ul className="listNavbar">
          <li className="itemNavbar" onClick={() => getNewsByCategory('general', 'Geral').then(() => showCategories())}>Geral</li>
          <li className="itemNavbar" onClick={() => getNewsByCategory('world', 'Mundo').then(() => showCategories()) }>Mundo</li>
          <li className="itemNavbar" onClick={() => getNewsByCategory('nation', 'Brasil').then(() => showCategories()) }>Brasil</li>
          <li className="itemNavbar" onClick={() => getNewsByCategory('business', 'Negócios').then(() => showCategories()) }>Negócios</li>
          <li className="itemNavbar" onClick={() => getNewsByCategory('technology', 'Tecnologia').then(() => showCategories()) }>Tecnologia</li>
          <li className="itemNavbar" onClick={() => getNewsByCategory('entertainment', 'Entretenimento').then(() => showCategories()) }>Entretenimento</li>
          <li className="itemNavbar" onClick={() => getNewsByCategory('sports', 'Esportes').then(() => showCategories()) }>Esporte</li>
          <li className="itemNavbar" onClick={() => getNewsByCategory('science', 'Ciência').then(() => showCategories()) }>Ciência</li>
          <li className="itemNavbar" onClick={() => getNewsByCategory('health', 'Saúde').then(() => showCategories()) }>Saúde</li>
        </ul>
        <GiHamburgerMenu className="menuIcon" onClick={() => showCategories()}/>
      </div>
    </div>
  )
}
