import { useEffect, useRef, useState } from "react";
import Molecule from "./Components/Molecule";
import FavFrame from "./Components/Favframe";
import useNewsProvider from "./Providers/NewsProvider";
import useFavProvider from "./Providers/FavProvider";
import NewsArticle from "./Components/NewsArticle";
import "./App.css";
import Paginator from "./Components/Paginator";
import ErrorPop from "./Components/errorPop";
import Logo from "./assets/Images/globe.png";
import { categories } from "./Utils/consts";

const App = () => {
  const [page, setPage] = useState(1);
  const {
    isReading,
    newsArticle,
    isError,
    setNewsCategory,
    newsCategory,
    setBackToHome,
    clearReadingMode,
    areArticlesLoading,
  } = useNewsProvider();
  const {
    setReadingInFavMode,
    clearReadingInFavMode,
    isReadingFavMode,
    initializeFavList,
  } = useFavProvider();

  const logoRef = useRef();

  useEffect(() => {
    initializeFavList();
  }, []);

  useEffect(() => {
    if (isReading && !!newsArticle) setPage(2);
  }, [isReading, newsArticle]);

  useEffect(() => {
    if (!areArticlesLoading) {
      logoRef.current.style.setProperty("--animate-times", 1);
      console.log("articles are loaded");
    }
  }, [areArticlesLoading]);

  const turnPage = (page_idx) => {
    setPage(page_idx);
    if (page_idx == 1) {
      setBackToHome(true);
    }
    if (page_idx == 3) {
      setReadingInFavMode();
    }
    if (page_idx == 1 || (page_idx == 2 && !isReadingFavMode)) {
      clearReadingInFavMode();
    }
    if (page_idx !== 2) {
      clearReadingMode();
    }
  };

  const changeCategory = (e) => {
    setNewsCategory(e.target.value);
    turnPage(1);
  };

  return (
    <div className="flex-c">
      <nav className={"navbar"}>
        <img ref={logoRef} src={Logo} className="logo" />
        <div className="nav-link" onClick={() => turnPage(1)}>
          Home
        </div>
        <select
          name="category"
          value={newsCategory}
          onChange={(e) => changeCategory(e)}
        >
          {categories.map((ct, idx) => (
            <option key={idx} value={ct}>
              {ct}
            </option>
          ))}
        </select>
        <div className="fav nav-link" onClick={() => turnPage(3)}>
          Favorites
        </div>
      </nav>
      <main>
        {page == 1 ? (
          <div>
            <Molecule> </Molecule>
            <footer>
              <Paginator></Paginator>
            </footer>
          </div>
        ) : page == 2 ? (
          <NewsArticle></NewsArticle>
        ) : (
          <FavFrame></FavFrame>
        )}
      </main>
      {isError ? (
        <div className="error-pop">
          <ErrorPop></ErrorPop>
        </div>
      ) : null}
    </div>
  );
};

export default App;
