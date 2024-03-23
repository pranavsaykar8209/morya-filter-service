import React, { useRef, useState, ChangeEvent, FormEvent } from "react";
import { getDatabase, ref, push } from "firebase/database";
import { storage } from "../../firebase.config";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
} from "firebase/storage";
import { saveItem } from "../../utils/Firebase-Functions";

interface Product {
  name: string;
  price: string;
  images: string[]; // Change from string | null to string[]
}

interface BrandsByProductType {
  [key: string]: string[];
}

function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setproductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productRating, setproductRating] = useState("");
  const [productImages, setProductImages] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [productType, setProductType] = useState("");
  const [productBrand, setProductBrand] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setProductName("");
    setproductDescription("");
    setProductPrice("");
    setproductRating("");
    setProductImages(null);
    setUploadProgress(null);
    setProductType("");
    setProductBrand("");
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input field value
    }
  };

  const brandsByProductType: BrandsByProductType = {
    waterPurifier: ["Kent", "Aquaguard", "Pureit", "Eureka Forbes"],
    solar: ["Tesla", "SunPower", "Canadian Solar", "Trina Solar"],
    waterHeater: ["AO Smith", "Racold", "Bajaj", "Havells"],
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setProductImages(files);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productImages) {
      console.error("Please select images.");
      return;
    }

    // Array to store the download URLs of uploaded images
    const downloadURLs: string[] = [];

    // Loop through each selected file and upload it to Firebase Storage
    for (let i = 0; i < productImages.length; i++) {
      const file = productImages[i];
      const storageRefVar = storageRef(
        storage,
        `product-images/${productName}+${i}`
      );
      console.log("storageRefVar", storageRefVar);
      const uploadTask = uploadBytesResumable(storageRefVar, file);

      // Add event listener to track upload progress
      uploadTask.on(
        "state_changed",
        (snapshot: UploadTaskSnapshot) => {
          // Track upload progress for individual image
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error: any) => {
          console.error("Error uploading image:", error);
        },
        () => {
          // Image uploaded successfully, get download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Add download URL to the array
            downloadURLs.push(downloadURL);

            // If all images have been uploaded, save product data to Firebase Realtime Database
            if (downloadURLs.length === productImages.length) {
              const productsRef = ref(getDatabase(), "products");
              push(productsRef, {
                name: productName,
                desc: productDescription,
                price: productPrice,
                rating: productRating,
                type: productType,
                brand: productBrand,
                images: downloadURLs, // Change from image: downloadURL to images: downloadURLs
              } as Product);
              
              saveItem(
                {
                  name: productName,
                  desc: productDescription,
                  price: productPrice,
                  rating: productRating,
                  type: productType,
                  brand: productBrand,
                  images: downloadURLs, // Change from image: downloadURL to images: downloadURLs
                },
                productType
              );
              reset();
            }
          });
        }
      );
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <form onSubmit={handleSubmit} style={{ width: "20rem" }}>
        <input
          className="form-control mb-3 mt-1"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          className="form-control mb-3 mt-1"
          id="InputDesc"
          aria-describedby="emailHelp"
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setproductDescription(e.target.value)}
        />

        <input
          className="form-control mb-3 mt-1"
          id="InputPrice"
          aria-describedby="emailHelp"
          type="text"
          placeholder="Product Prise"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />

        <input
          className="form-control mb-3 mt-1"
          id="InputRate"
          aria-describedby="emailHelp"
          type="text"
          placeholder="Product Rating"
          value={productRating}
          onChange={(e) => setproductRating(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          multiple // Allow multiple file selection
          onChange={handleImageChange}
          className="form-control mb-3 mt-1"
          id="customFile"
          ref={inputRef}
        />
        <select
          className="form-select mb-3 mt-1"
          aria-label="Default select example"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          <option selected>Select Type of Product</option>
          <option value="waterPurifier">Water Purifier</option>
          <option value="solar">Solar</option>
          <option value="waterHeater">Water Heater</option>
        </select>

        {productType && (
          <select
            className="form-select mb-3 mt-1"
            aria-label="Select Brand"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          >
            <option value="">Select Brand</option>
            {brandsByProductType[productType].map((brandOption) => (
              <option key={brandOption} value={brandOption}>
                {brandOption}
              </option>
            ))}
          </select>
        )}
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
        {uploadProgress && <p>Upload Progress: {uploadProgress}%</p>}
      </form>
    </div>
  );
}

export default AddProductForm;
