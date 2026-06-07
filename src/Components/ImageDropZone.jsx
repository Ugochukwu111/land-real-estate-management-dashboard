import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';
import './ImageDropZone.css'

export default function ImageDropZone({ selectedImage, onImageSelect }) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.webp', '.jpg'] },
    maxFiles: 1
  });

  const handleRemove = (e) => {
    e.stopPropagation(); 
    onImageSelect(''); 
  };

  return (
    <div 
      {...getRootProps()} 
      className={`dropzone-container ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      
      {selectedImage ? (
        <div className="preview-wrapper">
          <img 
            src={URL.createObjectURL(selectedImage)} 
            alt="Property Preview" 
            className="preview-image"
          />
          <button 
            type="button"
            onClick={handleRemove}
            className="remove-btn"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="dropzone-placeholder">
          <UploadCloud size={40} className="upload-icon" />
          <p className="placeholder-text">
            {isDragActive ? "Drop the listing image here..." : "Drag & drop an image, or click to browse"}
          </p>
          <p className="support-text">Supports JPEG, PNG, WEBP</p>
        </div>
      )}
    </div>
  );
}