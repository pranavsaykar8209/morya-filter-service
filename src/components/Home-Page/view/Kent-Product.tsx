import React, { useEffect } from "react";
import { getAllFoodItems } from "../../../utils/Firebase-Functions";

import { getDatabase, ref, onValue } from "firebase/database";

// Initialize Firebase database
const database = getDatabase();

// Reference to the "products" node in Firebase Realtime Database
const productsRef = ref(database, "products");

// Fetch the list of products

const KentProducts = () => {
  useEffect(() => {
    getAllFoodItems("waterPurifier").then((res: any) => {
      console.log("response---", res);
    });
  }, []);

  return <div>KentProducts</div>;
};

export default KentProducts;
