/* eslint-disable react/jsx-key */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { storage, db } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, collection, setDoc, getDocs } from "firebase/firestore";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const FileUpload = () => {
  const [file, setfile] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [images, setImages] = useState([]);

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const [loading, setloading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    loadAllImages();
  }, []);

  useEffect(() => {
    if (!open) {
      setUploaded(false);
    }
  }, [open]);

  const loadAllImages = async () => {
    setloading(true);
    const querySnapshot = await getDocs(collection(db, "images"));
    let currImages = [];
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, "=>", doc.data());
      currImages = [...currImages, doc.data().imageUrl];
    });
    setImages(currImages);
    setloading(false);
  };

  const handleChange = (event) => {
    setfile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file == "") {
      alert("Select an image");
    }
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploaded(false);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log("download url:", downloadURL);
          const imageStoreRef = doc(db, "images", file.name);
          setDoc(imageStoreRef, {
            imageUrl: downloadURL,
          });
        });
        setUploaded(true);
      }
    );
  };

  return (
    <div className="image-list">
      {loading && <p>Loading collection</p>}
      {images &&
        images.map((imageUrl) => {
          return (
            <div className="image-container">
              <img src={imageUrl} />
            </div>
          );
        })}
      <button onClick={openModal} className="smaller-button">
        Upload an image
      </button>
      <Popup open={open} onClose={closeModal}>
        <input type="file" accept="/image/*" onChange={handleChange}></input>
        <button onClick={handleUpload} className="submit-button">
          Submit
        </button>
        {uploaded && <p className="success-msg">Image was uploaded</p>}
      </Popup>
    </div>
  );
};

export default FileUpload;
