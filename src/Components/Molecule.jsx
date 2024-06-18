import Atom from "./Atom";
import styles from "./Molecule.module.css";

const Molecule = () => {
  return (
    <div className={`${styles.molecule}`}>
      {Array.from({ length: 10 }).map((short, idx) => (
        <Atom key={idx} articleNo={idx}></Atom>
      ))}
    </div>
  );
};

export default Molecule;
