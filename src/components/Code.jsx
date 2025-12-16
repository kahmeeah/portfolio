import { useState, useEffect, useCallback } from 'react';
import { projects } from '../data/code';

const isImage = (url) => !url.endsWith('.mp4');

const Code = () => {
  const [selectedProject, setSelectedProject] = useState(null); // null = gallery view
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  // wrap in useCallback 2 prevent infinite rerenders
  const navigateProject = useCallback((direction) => {
    if (!selectedProject) return; 

    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + direction + projects.length) % projects.length;
    const nextProject = projects[nextIndex];
    
    setSelectedProject(nextProject);
    setCurrentImageIndex(0); // reset to default
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;

      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowLeft') navigateProject(-1);
      if (e.key === 'ArrowRight') navigateProject(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, navigateProject]);

  // selected proj closeup view
  if (selectedProject) {
      const currentSrc = selectedProject.images[currentImageIndex];
      const isCurrentContentImage = isImage(currentSrc);
      
    return (
      <div id="project-view" className="view-container active fadeIn-animation">
        {/* <div id="nav-left" className="nav-zone" onClick={() => navigateProject(-1)}></div>
          <div id="nav-right" className="nav-zone" onClick={() => navigateProject(1)}></div> */}
        <title>Kahmeeah Obey · Code</title>
        <div className="project-content-wrapper">
     

          <div className="project-body">
            <div className="project-left">
              <div className="image-container">
                
                {isCurrentContentImage ? (
                  // render img
                  <img 
                      id="project-main-img" 
                      className="cursor-zoom-in" 
                      onClick={() => window.open(currentSrc, '_blank')}
                      src={currentSrc}
                      alt={selectedProject.title}
                      style={{ width: '100%', height: '60vh', objectFit: 'contain' }}
                  />
                ) : (
                  // render vid
                  <video 
                      id="project-main-vid" 
                      className="cursor-zoom-in" 
                      controls 
                      autoPlay 
                      muted
                      loop
                      style={{ width: '100%', height: '60vh', objectFit: 'contain' }}
                      onClick={() => window.open(currentSrc, '_blank')}
                  >
                      <source src={currentSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              <div id="project-thumbs" className="thumb-strip">
                {selectedProject.images.map((img, index) => {
                    const isThumbImage = isImage(img);
                    const isActive = index === currentImageIndex;
                    const handleClick = (e) => {
                        e.stopPropagation(); 
                        setCurrentImageIndex(index);
                    };

                    return (
                        <div 
                            key={index}
                            className={`thumb-item ${isActive ? 'active' : ''}`}
                            onClick={handleClick}
                        >
                            {isThumbImage ? (
                                // render img/gif
                                <img 
                                    src={img}
                                    alt={`Project thumbnail ${index + 1}`}
                                />
                            ) : (
                                // render placeholder for vid thumbnail
                                <span style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    cursor: 'pointer',
                                    height: '100%', 
                                    backgroundColor: '#333',
                                    color: 'white',
                                    padding: '5px',
                                    fontSize: '10px',
                                    textAlign: 'center'
                                }}>
                                    VIDEO DEMO
                                </span>
                            )}
                        </div>
                    );
                })}
              </div>
            </div>

            <div className="project-right">
              <span 
                id="back-to-gallery"
                className="back-link" 
                onClick={() => setSelectedProject(null)}
              >
                ← Back to all
              </span>
              
              <p id="project-summary" className="summary-text">{selectedProject.summary}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // default/gallery view
  return (
    <div id="gallery-view" className="view-container active fadeIn-animation">
        <title>Kahmeeah Obey · Code</title>
        
        <div className="gallery" id='code'>
            {projects.map((project) => (
                <div 
                    key={project.id}
                    data-project={project.id} 
                    onClick={() => {
                        setSelectedProject(project);
                        setCurrentImageIndex(0);
                        window.scrollTo(0,0);
                    }}
                >
                    <img 
                        className="item cursor-pointer hover:opacity-90 transition-opacity" 
                        src={project.cover} 
                        alt={project.title} 
                    />
                </div>
            ))}
        </div>
    </div>
  );
};

export default Code;