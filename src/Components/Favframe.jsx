import useFavProvider from "../Providers/FavProvider";
import Atom from "./Atom";
import styles from "./Favframe.module.css";

const FavFrame = () => {
  const { favList } = useFavProvider();

  if (favList.length === 0) {
    return (
      <div className={`${styles["empty-list"]} flex`}>
        So empty! <br /> Start by adding some articles to your favorites.
      </div>
    );
  }

  return (
    <div className={`${styles.molecule}`}>
      {favList.map((fav, idx) => (
        <Atom key={idx} favArticle={fav}></Atom>
      ))}
    </div>
  );
};

export default FavFrame;
