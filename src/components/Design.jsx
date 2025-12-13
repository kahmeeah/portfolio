import Block from "./Block";
import { projects } from "../data/design"
const Design = () => {
  return (
    <div class="design-container fadeIn-animation">
        {projects.map( project => (
            <Block 
            key={project.id} 
            title={project.title}
            type={project.type}
            summary={project.summaJry}
            image={project.summary}
            />

        ))}
         
    </div>
  );
};

export default Design;