import { articles } from "./Nature";
import { entertainment_articles } from "./entertainment";
import { politics } from "./Politics";
import { sports } from "./sports";
import { stocks } from "./stocks";
import { tech } from "./tech";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

let data = tech;
let col_name = "tech";

function writeData() {
  data.map(async (article, idx) => {
    article.source = "".concat(article.source);
    await addDoc(collection(db, col_name), article);
  });
}

export default writeData;
