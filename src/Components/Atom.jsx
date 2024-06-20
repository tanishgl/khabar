import { useEffect, useState } from "react";
import styles from "./Atom.module.css";
import Picture from "./Picture";
import News from "../Models/NewsModel";
import useNewsProvider from "../Providers/NewsProvider";
import { PAGE_SIZE } from "../Utils/consts";
import NoImg from "../assets/Images/No_img.png";

const MAX_TITLE_SIZE = 70;

/* eslint-disable react/prop-types */
const Atom = ({ articleNo, favArticle }) => {
  const [isWasted, setIsWasted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState(null);
  const [pan, setPan] = useState(-1);
  const { readArticle, articles, areArticlesLoading, page, backToHome, size } =
    useNewsProvider();

  useEffect(() => {
    if (favArticle) {
      setNews(favArticle);
      setIsLoading(false);
    }
  }, [favArticle]);

  useEffect(() => {
    if (!areArticlesLoading && size && pan >= size) {
      setIsWasted(true);
    } else {
      setIsWasted(false);
    }
  }, [areArticlesLoading, page, size, pan]);

  useEffect(() => {
    if (articles && articles[pan]) {
      setNews(new News(articles[pan]));
      setIsLoading(false);
    }
  }, [articles, pan]);

  useEffect(() => {
    const PAN = (page - 1) * PAGE_SIZE + articleNo;
    setPan(PAN);
  }, [page, backToHome]);

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
      <Picture
        pathname={news?.urlToImage ?? NoImg}
        isLoading={isLoading}
      ></Picture>
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
