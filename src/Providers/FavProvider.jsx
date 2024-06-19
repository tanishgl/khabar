import { createContext, useContext, useState } from "react";

const FavContext = createContext();

// eslint-disable-next-line react/prop-types
export const FavProvider = ({ children }) => {
  const [favList, setFavList] = useState([]);
  const [isReadingFavMode, setIsReadingFavMode] = useState(false);

  const initializeFavList = () => {
    const storedFavs = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("NEWS_")) {
        const item = localStorage.getItem(key);
        try {
          const storedFav = JSON.parse(item);
          storedFavs.push(storedFav);
        } catch (error) {
          console.log(`Error while parsing JSON for key = ${key}`);
          console.log(error);
        }
      }
    }
    setFavList(storedFavs);
  };

  const setReadingInFavMode = () => {
    setIsReadingFavMode(true);
  };

  const clearReadingInFavMode = () => {
    setIsReadingFavMode(false);
  };

  const addToFav = (news) => {
    if (isInFav(news)) return;
    setFavList((favList) => [...favList, news]);
    localStorage.setItem(`NEWS_${news.title}`, JSON.stringify(news));
  };

  const removeFromFav = (news) => {
    let newsIdx = getNewsArticle(news);
    if (newsIdx === -1) return;
    let updatedFavList = [...favList];
    updatedFavList.splice(newsIdx, 1);
    setFavList(updatedFavList);
    localStorage.removeItem(news.title);
  };

  const getNewsArticle = (news) => {
    let searchingFor = favList.findIndex(
      (fav) => fav.publishedAt === news.publishedAt && fav.title === news.title
    );
    return searchingFor;
  };

  const isInFav = (news) => {
    let articleIdx = getNewsArticle(news);
    return articleIdx !== -1;
  };

  return (
    <FavContext.Provider
      value={{
        favList,
        addToFav,
        isInFav,
        isReadingFavMode,
        setReadingInFavMode,
        clearReadingInFavMode,
        removeFromFav,
        initializeFavList,
      }}
    >
      {children}
    </FavContext.Provider>
  );
};

const useFavProvider = () => {
  const context = useContext(FavContext);
  if (context === undefined) throw new Error("used out of scope");
  return context;
};

export default useFavProvider;
