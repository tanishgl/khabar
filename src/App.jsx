import { useEffect, useState } from "react";
import Molecule from "./Components/Molecule";
import useNewsProvider from "./Providers/NewsProvider";
import NewsArticle from "./Components/NewsArticle";
import "./App.css";
import Paginator from "./Components/Paginator";
import ErrorPop from "./Components/errorPop";

const App = () => {
  const [page, setPage] = useState(1);
  const {
    isReading,
    newsArticle,
    isError,
    setNewsCategory,
    newsCategory,
    setBackToHome,
  } = useNewsProvider();

  useEffect(() => {
    if (isReading && !!newsArticle) setPage(2);
  }, [isReading, newsArticle]);

  const turnPage = (page_idx) => {
    setPage(page_idx);
    setBackToHome(true);
  };

  const changeCategory = (e) => {
    setNewsCategory(e.target.value);
  };

  const categories = [
    "sports",
    "entertainment",
    "nature",
    "stocks",
    "politics",
    "tech",
  ];
  return (
    <div>
      <nav className={"navbar"}>
        <div className="nav-link logo" onClick={() => turnPage(1)}>
          Khabar
        </div>
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
        <input
          type="text"
          placeholder="News at a touch"
          minLength={3}
          maxLength={20}
        ></input>
        <div className="fav nav-link"> Favorites</div>
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
          <div> </div>
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
