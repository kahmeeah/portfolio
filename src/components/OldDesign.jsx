import { useState, useEffect, useCallback } from 'react';
import { projects } from '../data/design';

const OldDesign = () => {
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
    return (
      <div id="project-view" className="view-container active fadeIn-animation">
        <title>Kahmeeah Obey · Design</title>
        <div className="project-content-wrapper">
          
          <div id="nav-left" className="nav-zone" onClick={() => navigateProject(-1)}></div>
          <div id="nav-right" className="nav-zone" onClick={() => navigateProject(1)}></div>

          <div className="project-body">
            <div className="project-left">
              <div className="image-container">
                <img 
                  id="project-main-img" 
                  src={selectedProject.images[currentImageIndex]} 
                  alt={selectedProject.title}
                  className="cursor-zoom-in"
                  onClick={() => window.open(selectedProject.images[currentImageIndex], '_blank')}
                />
              </div>
              
              <div id="project-thumbs" className="thumb-strip">
                {selectedProject.images.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    className={index === currentImageIndex ? 'active' : ''}
                    onClick={(e) => {
                        e.stopPropagation(); // stop the navzone click
                        setCurrentImageIndex(index);
                    }}
                    alt="thumbnail"
                  />
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
            ))}
        </div>
    </div>
  );
};

export default OldDesign;