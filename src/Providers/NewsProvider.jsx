import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import news from "../Data/News";

/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";

const PAGE_SIZE = 8;

const newsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [newsData, setNewsData] = useState([]);
  const [isReading, setIsReading] = useState(false);
  const [newsArticle, setNewsArticle] = useState({});
  const [articles, setArticles] = useState([]);
  const [areArticlesLoading, setAreArticlesLoading] = useState(false);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const clearError = () => {
    setIsError(false);
  };
    try {
      setAreArticlesLoading(true);
      const q = query(
        collection(db, category),
        orderBy("publishedAt", "desc"),
        limit(PAGE_SIZE)
      );
      const querySnapshot = await getDocs(q);
      setSize(querySnapshot.size);
      const fetched_articles = [];
      querySnapshot.forEach((doc) => {
        fetched_articles.push(doc.data());
      });
      setArticles((articles) =>
        fetched_articles.filter((article) => article.title !== "[Removed]")
      );
    } catch (error) {
      console.log(error);
    } finally {
      setAreArticlesLoading(false);
    }
  };

  const fetchArticleByNumber = (idx) => {
    if (idx == articles.length) return;
    return articles[idx];
  };

  const readArticle = (article) => {
    console.log(article);
    setIsReading(true);
    setNewsArticle(article);
  };

  useEffect(() => {
    setNewsData((newsData) => [...newsData, ...news]);
  }, []);

  return (
    <newsContext.Provider
      value={{
        news: newsData,
        isReading,
        newsArticle,
        articles,
        areArticlesLoading,
        size,
        fetchArticles,
        readArticle,
        fetchArticleByNumber,
      }}
    >
      {children}
    </newsContext.Provider>
  );
};

const useNewsProvider = () => {
  let context = useContext(newsContext);
  if (context == undefined) throw new Error("Outside scope");
  return context;
};

export default useNewsProvider;
