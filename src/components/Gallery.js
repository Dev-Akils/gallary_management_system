import React from "react";

const Gallery = ({
  images,
  onDelete,
  onEditToggle,
  onTitleChange,
  onSave,
  onImageUpdate,
}) => {
  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpdate(id, file);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative group overflow-hidden rounded-lg shadow-lg bg-white"
        >
          <img
            src={img.id}
            alt="uploaded"
            className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-300"
          />

          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => onDelete(img.id)}
              className="bg-red-600 text-white text-xs px-2 py-1 rounded-full"
            >
              ✕
            </button>
            <button
              onClick={() => onEditToggle(img.id)}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
            >
              ✎
            </button>
          </div>

          <div className="p-3">
            {img.isEditing ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={img.title}
                    onChange={(e) => onTitleChange(img.id, e.target.value)}
                    className="w-full border border-gray-300 px-2 py-1 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-blue-600 cursor-pointer hover:underline">
                    Replace Image
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, img.id)}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={() => onSave(img.id)}
                    className="text-white bg-green-500 px-2 py-1 text-xs rounded-md"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-sm text-gray-700 font-medium">
                {img.title}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
