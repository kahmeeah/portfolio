const About = () => {
  return (
    <div className="about-grid fadeIn-animation">
        <title>Kahmeeah Obey · About</title>

        <div className="about-side">
            <a href="mailto:kahmeeah@nyu.edu">email me</a>
            <br/>
            <a href="/images/Kahmeeah_Obey_Resume.pdf" target="_blank" rel="noopener noreferrer">view resume</a>
            <br/>
            <a href="https://github.com/kahmeeah" target="_blank">github</a>
            
        </div>
        
        <div className="about-body">
            <p style= {{ marginTop: 0 }}>
                my name is kahmeeah obey. i like making things with computers and with my hands. i graduated from
                nyu with a b.a. in computer science,
                and a minor in digital arts & design.
                 </p>
                
                <p>when i'm not creating - i'm collecting tea tags, digging through fields 
                    of clovers, and taking care of my son (pictured right).</p>
                </div>
                
        <div className="about-pic">
            <img src="/images/montybear.svg" alt="" style= {{ maxWidth: '85%' }} />
        
        </div>
    </div>
    
  );
};

export default About;