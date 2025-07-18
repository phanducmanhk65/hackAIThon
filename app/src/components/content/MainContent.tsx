import { Route, Routes } from "react-router-dom";
import { DashBoard } from "../../pages/dashboard/DashBoard";
import { Projects } from "../../pages/projects/Projects";
import { ProjectProvider } from "../../context/ProjectContext";
import { ProjectDetail } from "../../pages/project_detail/ProjectDetail";
import { CodeStandard } from "../../pages/code_standard/CodeStandard";
import { NewPullRequest } from "../../pages/pull_request/NewPullRequest";

export const MainContent = () => {
  return (
    <ProjectProvider>
      <Routes>
        <Route path="/dashboard" Component={DashBoard} />

        <Route path="/projects" Component={Projects} />
        <Route path="project/detail" Component={ProjectDetail} />
        <Route path="project/create-pull-request" Component={NewPullRequest} />
        <Route path="code-standard" Component={CodeStandard} />
        <Route path="/*" Component={DashBoard} />
      </Routes>
    </ProjectProvider>
  );
};
