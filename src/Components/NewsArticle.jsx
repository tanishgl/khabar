import { useEffect } from "react";
import useNewsProvider from "../Providers/NewsProvider";
import styles from "./NewsArticle.module.css";

const NewsArticle = () => {
  const { newsArticle } = useNewsProvider();
  useEffect(() => {
    console.log(newsArticle);
  }, [newsArticle]);

  const formatDate = (date) => {
    console.log(date);
    console.log(typeof date);
    return `${date.getMonth()}-${date.getDate()}-${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <div className={`${styles["news-article"]}`}>
      <header>
        <h2 className={`${styles["news-title"]}`}> {newsArticle.title} </h2>
        <img src={newsArticle.urlToImage} className={`${styles["news-img"]}`} />
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
