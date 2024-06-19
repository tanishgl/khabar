import useNewsProvider from "../Providers/NewsProvider";
import useFavProvider from "../Providers/FavProvider";
import styles from "./NewsArticle.module.css";
import estyles from "./ErrorPop.module.css";
import { useEffect, useState } from "react";

const NewsArticle = () => {
  const [isWasted, setIsWasted] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const { newsArticle } = useNewsProvider();
  const { addToFav, isInFav, removeFromFav, isReadingFavMode } =
    useFavProvider();

  useEffect(() => {
    if (isInFav(newsArticle)) {
      setIsFav(true);
    }
  }, [newsArticle]);

  const setFav = () => {
    setIsFav(true);
    addToFav(newsArticle);
    setTimeout(() => {
      setIsWasted(true);
    }, 4000);
  };

  const clearAsFav = () => {
    removeFromFav(newsArticle);
    setIsFav(false);
  };

  const formatDate = (date) => {
    return `${date.getMonth()}-${date.getDate()}-${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div className={`${styles["news-article"]}`}>
      <header>
        <h2 className={`${styles["news-title"]}`}> {newsArticle.title} </h2>
        <div className={`${styles["news-panel"]}`}>
          <img
            src={newsArticle.urlToImage}
            className={`${styles["news-img"]}`}
          />
          {!isFav ? (
            <div onClick={setFav} className={`${styles["fav-btn"]}`}>
              Add to favorites
            </div>
          ) : !isWasted && !isReadingFavMode ? (
            <div className={`${styles["fav-added"]}`}>
              <p> Added To Favs </p>
              <div className={`${estyles["slider"]}`}></div>{" "}
            </div>
          ) : (
            <div onClick={clearAsFav} className={`${styles["unfav-btn"]}`}>
              Remove from favorites
            </div>
          )}
        </div>
        <h3 className={`${styles["news-author"]}`}>{newsArticle.author}</h3>
        {newsArticle.publishedAt ? (
          <h3 className={`${styles["news-date"]}`}>
            Published At {formatDate(new Date(newsArticle.publishedAt))}
          </h3>
        ) : null}
      </header>
      <article className={`${styles["news-body"]}`}>
        {newsArticle.description}
      </article>
    </div>
  );
};

export default NewsArticle;
