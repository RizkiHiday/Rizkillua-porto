import { useState } from 'react';
import ChromaGrid from '../ChromaGrid/ChromaGrid';
import './VideoGrid.css';

const VideoGrid = ({ videos, radius = 300, damping = 0.45, fadeOut = 0.6, ease = 'power3.out' }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsLoading(true);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    setIsLoading(false);
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div style={{ height: 'auto', position: 'relative', minHeight: '600px' }}>
        <ChromaGrid
          items={videos}
          onItemClick={handleVideoClick}
          radius={radius}
          damping={damping}
          fadeOut={fadeOut}
          ease={ease}
        />
      </div>

      {selectedVideo && (
        <div className="video-modal" onClick={handleCloseModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={handleCloseModal}>
              ×
            </button>
            <div className="video-wrapper">
              {isLoading && (
                <div className="video-loading">
                  <div className="spinner"></div>
                  <p>Loading video...</p>
                </div>
              )}
              
              {selectedVideo.isLocal ? (
                <video 
                  controls 
                  autoPlay 
                  preload="metadata"
                  onLoadedData={handleVideoLoaded}
                  onCanPlay={handleVideoLoaded}
                  style={{ display: isLoading ? 'none' : 'block' }}
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={selectedVideo.videoUrl}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  onLoad={handleIframeLoad}
                  style={{ 
                    display: isLoading ? 'none' : 'block',
                    width: '100%',
                    height: '70vh',
                    border: 'none'
                  }}
                ></iframe>
              )}
            </div>
            <div className="video-modal-info">
              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGrid;
