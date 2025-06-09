import { Route, Routes } from "react-router-dom";
import { DashBoard } from "../../pages/dashboard/DashBoard";
import { Projects } from "../../pages/projects/Projects";
import { ProjectProvider } from "../../context/ProjectContext";
import { ProjectDetail } from "../../pages/project_detail/ProjectDetail";

export const MainContent = () => {
  return (
    <ProjectProvider>
      <Routes>
        <Route path="/dashboard" Component={DashBoard} />

        <Route path="/projects" Component={Projects} />
        <Route path="project/detail" Component={ProjectDetail} />
        <Route path="/*" Component={DashBoard} />
      </Routes>
    </ProjectProvider>
  );
};
