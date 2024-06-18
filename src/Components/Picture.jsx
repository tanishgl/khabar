/* eslint-disable react/prop-types */
import styles from "./Picture.module.css";
const Picture = ({ pathname, isLoading }) => {
  if (isLoading) {
    return <div className={`${styles["buffer-box"]}`}></div>;
  }
  return (
    <div className={`${styles["pic-box"]}`}>
      <img src={pathname} className={`${styles["pic-pic"]}`} />
    </div>
  );
};

export default Picture;
