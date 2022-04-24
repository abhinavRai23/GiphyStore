import {useState, useEffect} from 'react';
import "./ImgGallery.css";

export default function ImgGallery(props) {
  const { list, loading, error } = props;
  const [previewItem, updatePreviewItem] = useState("");

  const showPreview = (e) => {
    const node = e.target;
    const src = node.getAttribute("data-preview");
    updatePreviewItem(src);
  };

  const handleClose= () => {
      updatePreviewItem('');
  }

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        updatePreviewItem('')
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[])

  return (
    <>
      <div className="photo-container" onClick={showPreview}>
        {list.map((item) => (
          <div key={item.id}>
            <img
              src={item.images.preview_webp.url}
              alt={item.title}
              data-preview={item.images.original.webp}
            />
          </div>
        ))}
      </div>
      {previewItem && (
        <div className="image-preview" onClick={handleClose}>
          <div className="display-section">
            <img src={previewItem} alt="Preview not available for this gif :(. Try another one :p" onClick={(e)=>e.stopPropagation()}/>
          </div>
          <div className="close" onClick={handleClose}>X</div>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
    </>
  );
}
