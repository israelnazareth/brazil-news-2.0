import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import Footer from './components/Footer/Footer';
import './App.css';
import { ContextProvider } from './context/MyContext';

export default function App() {

  return (
    <ContextProvider>
      <div className="App">
        <Header />
        <MainPage />
        <Footer />
      </div>
    </ContextProvider>
  );
}
