import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveItem = async (data: any, productType: string) => {
  console.log("data", data);
  await setDoc(doc(firestore, productType, `${Date.now()}`), data, {
    merge: true,
  });
};

export const getAllFoodItems = async (productType: string) => {
  const items = await getDocs(
    query(collection(firestore, productType), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
