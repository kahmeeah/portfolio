const Block = ({ title, summary, image, type }) => {

    // const imageUrl = '/images/works/THISISNOTABRICK/cover.png';
    return (
        <div className="block-container">
        
        <div className="block">

            <div className="block-text">
                <h1 className="block-h1">{title}</h1>
                <h2 className="block-h2">{type}</h2>
                <p className="block-p">{summary}
                </p>
            </div>

            <div style={ {alignSelf: "center", position:"relative", mixBlendMode:"multiply"} }>
                <img  className="block-img" src={image} >
                </img>

               <div className="ink-overlay"></div>
            </div>

            
        
        </div>

        <div className="line-break">
            <svg width="100%" height="15">
            <defs>
                <pattern id="dotPattern" width="10" height="15" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="7.5" r="1.5" fill="#281A13" /> 
                </pattern>
            </defs>
            
            <rect width="100%" height="15" fill="url(#dotPattern)" x="-2" />
            </svg>
        </div>

      </div>
    
    
  );
};

export default Block; 