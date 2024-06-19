import { useEffect, useState } from "react";
import useNewsProvider from "../Providers/NewsProvider";
import styles from "./ErrorPop.module.css";

const ErrorPop = () => {
  const [isWasted, setIsWasted] = useState(false);
  const { isError, clearError } = useNewsProvider();

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsWasted(true);
        clearError();
      }, 5000);
    }
  }, [isError]);

  if (isWasted) return null;

  return (
    <div className={`${styles["error-box"]}`}>
      <p>Something went wrong!</p>
      <div className={`${styles["slider"]}`}></div>
    </div>
  );
};

export default ErrorPop;
