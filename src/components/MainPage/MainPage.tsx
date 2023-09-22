import { useMyContext } from '../../context/MyContext'
import Cards from '../Cards/Cards'
import './MainPage.css'

export default function Headlines() {
  const { articles } = useMyContext()

  return (
    <div>
      { articles?.articles?.length ? <div>
        <h1 className='newsType' id="home">{articles.type}</h1>
        <div className='main'>
          <Cards />
        </div>
      </div> : <h1 className="noService">Desculpe o transtorno, estamos fora do ar no momento.</h1> }
    </div>
  )
}
