import React, { createContext, useState, ReactNode } from "react";

interface ProjectContextType {
  projectName: string;
  projectId: string;
  setProjectName: (name: string) => void;
  setProjectId: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");

  return (
    <ProjectContext.Provider
      value={{ projectName, setProjectName, projectId, setProjectId }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;

// export const useProjectContext = () => {
//   const context = React.useContext(ProjectContext);
//   if (!context) {
//     throw new Error("useProjectContext must be used within a ProjectProvider");
//   }
//   return context;
// };
