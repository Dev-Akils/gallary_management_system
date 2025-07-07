import React, { useState } from "react";
import Gallery from "./components/Gallery";
import "./App.css"
function App() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
      title: "Untitled",
      isEditing: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDelete = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleEditToggle = (id) => {
    setImages(
      images.map((img) =>
        img.id === id ? { ...img, isEditing: !img.isEditing } : img
      )
    );
  };

  const handleTitleChange = (id, newTitle) => {
    setImages(
      images.map((img) =>
        img.id === id ? { ...img, title: newTitle } : img
      )
    );
  };

  const handleSave = (id) => {
    setImages(
      images.map((img) =>
        img.id === id ? { ...img, isEditing: false } : img
      )
    );
  };

  const handleImageUpdate = (id, newFile) => {
    const newImageURL = URL.createObjectURL(newFile);
    setImages(
      images.map((img) =>
        img.id === id
          ? {
              ...img,
              file: newFile,
              id: newImageURL, // update preview image
            }
          : img
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-purple-600 mb-6">
          📸 Gallery Management System
        </h1>

        <div className="flex justify-center mb-8">
          <label className="cursor-pointer inline-block px-6 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
            Upload Images
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <Gallery
          images={images}
          onDelete={handleDelete}
          onEditToggle={handleEditToggle}
          onTitleChange={handleTitleChange}
          onSave={handleSave}
          onImageUpdate={handleImageUpdate}
        />
      </div>
    </div>
  );
}

export default App;
