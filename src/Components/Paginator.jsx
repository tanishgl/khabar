import { useEffect, useState } from "react";
import useNewsProvider from "../Providers/NewsProvider";
import { PAGE_SIZE } from "../Utils/consts";
import styles from "./Paginator.module.css";

const Paginator = () => {
  const [isLastPage, setIsLastPage] = useState(false);
  const { page, switchPage, size } = useNewsProvider();

  useEffect(() => {
    const lastPage = Math.ceil(size / PAGE_SIZE);
    setIsLastPage(page === lastPage ? true : false);
  }, [size, page]);

  const navigatePage = (direction) => {
    switchPage(page + direction);
  };

  return (
    <div>
      <button
        disabled={page === 1}
        onClick={(e) => navigatePage(-1)}
        className={`${styles["page-btn-prev"]}`}
      >
        &lt;&lt;
      </button>
      <button className={`${styles["page-btn"]}`}> {page} </button>
      <button
        disabled={isLastPage}
        onClick={(e) => navigatePage(1)}
        className={`${styles["page-btn-next"]}`}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Paginator;
