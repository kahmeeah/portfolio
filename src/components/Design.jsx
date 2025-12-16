import { useState, useEffect, useCallback } from 'react';
import { projects } from '../data/design';

const Design = () => {
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
    return (
      <div id="project-view" className="view-container active fadeIn-animation">
        <title>Kahmeeah Obey · Design</title>
        <div className="project-content-wrapper">
          
          {/* <div id="nav-left" className="nav-zone" onClick={() => navigateProject(-1)}></div>
          <div id="nav-right" className="nav-zone" onClick={() => navigateProject(1)}></div> */}

          <div className="project-body">
            <div className="project-left">
              <div className="image-container">
                <picture id="project-main-img" 
                className="cursor-zoom-in"
                    onClick={() => window.open(currentSrc, '_blank')} 
                    style={{ width: '100%', height: '60vh', objectFit: 'contain' }}>
                <source 
                    srcset={currentSrc.replace('/works/', '/works-webp/').replace(/\.(png|jpe?g)$/i, '.webp')} 
                    type="image/webp"
                />

                {/* fallback img */}
                <img 
              id="project-main-img" 
                className="cursor-zoom-in"
                    onClick={() => window.open(currentSrc, '_blank')}
                    src={currentSrc}
                    alt={selectedProject.title}
                    style={{ width: '100%', height: '60vh', objectFit: 'contain' }}

                    
                />
            </picture>
              </div>
              
              <div id="project-thumbs" className="thumb-strip">
                {selectedProject.images.map((img, index) => (
                  <picture className={index === currentImageIndex ? 'active' : ''}>
                  <source 
                      srcset={img.replace('/works/', '/works-webp/').replace(/\.(png|jpe?g)$/i, '.webp')} 
                      type="image/webp"
                  />

                  {/* fallback img */}
                  <img 
                      key={index}
                      src={img}
                      className={index === currentImageIndex ? 'active' : ''}
                      onClick={(e) => {
                          e.stopPropagation(); // stop the navzone click
                          setCurrentImageIndex(index);
                      }}
                      alt={`Project thumbnail ${index + 1}`}
                  />
              </picture>
                ))}
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
              
               {/* proj title */}
              {/* <h2 className="">{selectedProject.title}</h2>  */}

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
        <title>Kahmeeah Obey · Design</title>
        
        <div className="gallery">
            {projects.map((project) => (
                <picture
         
                >
                <source 
                    srcset={project.cover.replace('/works/', '/works-webp/').replace(/\.(png|jpe?g)$/i, '.webp')} 
                    type="image/webp"
                />
                
                {/* 2. fallback img */}
                <img 
                    key={project.id}
                    src={project.cover} 
                    alt={project.title} 
                    className="item cursor-pointer hover:opacity-90 transition-opacity"
                    data-project={project.id} 
                    onClick={() => {
                        setSelectedProject(project);
                        setCurrentImageIndex(0);
                        window.scrollTo(0,0);
                    }}
                />
            </picture>
            ))}
        </div>
    </div>
  );
};

export default Design;