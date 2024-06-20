import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { PAGE_SIZE } from "../Utils/consts";

const newsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [isReading, setIsReading] = useState(false);
  const [newsArticle, setNewsArticle] = useState({});
  const [articles, setArticles] = useState([]);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [areArticlesLoading, setAreArticlesLoading] = useState(true);
  const [newsCategory, setNewsCategory] = useState("entertainment");
  const [lastArticle, setLastArticle] = useState({});
  const [backToHome, setBackToHome] = useState(true);

  useEffect(() => {
    fetchArticlesByCategory();
  }, [newsCategory]);

  const switchPage = (toPage) => {
    setPage(toPage);
    fetchArticlesByPage(toPage);
  };

  const clearError = () => {
    setIsError(false);
  };

  const fetchArticlesByCategory = async () => {
    try {
      setAreArticlesLoading(true);
      const q = query(
        collection(db, newsCategory),
        where("title", "!=", "[Removed]"),
        orderBy("publishedAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      let fetched_articles = [];
      querySnapshot.forEach((doc) => {
        fetched_articles.push(doc.data());
      });
      setSize(fetched_articles.length);
      fetched_articles = fetched_articles.filter(
        (article, idx) => idx < PAGE_SIZE
      );
      setArticles(fetched_articles);
      setLastArticle(fetched_articles[fetched_articles.length - 1].publishedAt);
      setIsError(false);
      setPage(1);
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setAreArticlesLoading(false);
    }
  };

  const fetchArticlesByPage = async (page) => {
    if (articles.length >= page * PAGE_SIZE) return;
    try {
      setAreArticlesLoading(true);
      const q = query(
        collection(db, newsCategory),
        where("title", "!=", "[Removed]"),
        orderBy("publishedAt", "desc"),
        startAfter(lastArticle),
        limit(PAGE_SIZE)
      );
      const querySnapshot = await getDocs(q);
      let fetched_articles = [];
      querySnapshot.forEach((doc) => {
        fetched_articles.push(doc.data());
      });
      setArticles((articles) => [...articles, ...fetched_articles]);
      setLastArticle(fetched_articles[fetched_articles.length - 1].publishedAt);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setError(error);
    } finally {
      setAreArticlesLoading(false);
    }
  };

  const fetchArticleByNumber = (idx) => {
    if (idx == articles.length) return;
    return articles[idx];
  };

  const readArticle = (article) => {
    setIsReading(true);
    setNewsArticle(article);
    setBackToHome(false);
  };

  const clearReadingMode = () => {
    setIsReading(false);
    setNewsArticle({});
  };

  return (
    <newsContext.Provider
      value={{
        isReading,
        newsArticle,
        articles,
        areArticlesLoading,
        size,
        page,
        isError,
        newsCategory,
        backToHome,
        error,
        fetchArticles: fetchArticlesByCategory,
        readArticle,
        fetchArticleByNumber,
        switchPage,
        clearError,
        setNewsCategory,
        setBackToHome,
        fetchArticlesByPage,
        clearReadingMode,
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
