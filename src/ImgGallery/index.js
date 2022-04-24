import {useState, useEffect} from 'react';
import "./ImgGallery.css";

export default function ImgGallery(props) {
  const { list, loading, error } = props;
  const [preview, updatePreview] = useState({});
  const [paused, updatePaused] = useState(false);

  const showPreview = (e) => {
    const node = e.target;
    const gif = node.getAttribute("data-preview-gif");
    const still = node.getAttribute("data-preview-still");
    updatePreview({
      gif,
      still
    });
  };

  const handleClose= () => {
      updatePaused(false);
      updatePreview({});
  }

  const playPauseGif = (e) => {
    e.stopPropagation();
    updatePaused(!paused);
  }

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        handleClose()
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
              data-preview-gif={item.images.original.url}
              data-preview-still={item.images.original_still.url}
            />
          </div>
        ))}
      </div>
      {preview.gif && (
        <div className="image-preview" onClick={handleClose}>
          <div className="display-section">
            <img src={preview[paused?'still':'gif']} onClick={playPauseGif} alt="Preview not available for this gif :(. Try another one :p"/>
          </div>
          <div className="close" onClick={handleClose}>X</div>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
    </>
  );
}
