import { useEffect, useState } from "react";
import styles from "./Atom.module.css";
import Picture from "./Picture";
import News from "../Models/NewsModel";
import useNewsProvider from "../Providers/NewsProvider";

const MAX_TITLE_SIZE = 70;

/* eslint-disable react/prop-types */
const Atom = ({ articleNo }) => {
  const [isWasted, setIsWasted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState(null);
  const { readArticle, articles, size, areArticlesLoading } = useNewsProvider();

  useEffect(() => {
    if (!areArticlesLoading && size && articleNo >= size) {
      setIsWasted(true);
    }
  }, [areArticlesLoading, size]);

  useEffect(() => {
    if (articles && articles[articleNo]) {
      setNews(new News(articles[articleNo]));
      setIsLoading(false);
    }
  }, [articles]);

  const visitArticle = () => {
    if (news) readArticle(news);
  };

  const formatTitle = (title) => {
    if (!title) return "";
    if (title.length <= MAX_TITLE_SIZE) return title;
    return title.substring(0, MAX_TITLE_SIZE).concat("...");
  };

  if (isWasted) return null;

  return (
    <div className={`${styles.atom}`} onClick={visitArticle}>
      <Picture pathname={news?.urlToImage} isLoading={isLoading}></Picture>
      <div className={`${styles["atom-p2"]} `}>
        <h2 className={`${styles["atom-title"]} ${news ? "" : "buffer-box"}`}>
          {formatTitle(news?.title)}
        </h2>
        <p className={`${styles["atom-desc"]} ${news ? "" : "buffer-box"}`}>
          {news?.description}
        </p>
      </div>
    </div>
  );
};

export default Atom;
