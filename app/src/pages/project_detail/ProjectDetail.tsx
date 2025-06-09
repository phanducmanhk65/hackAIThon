/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import ProjectContext from "../../context/ProjectContext";
import { Tabs, type TabsProps } from "antd";
import { Overview } from "./Overview";
import { Settings } from "./Settings";
import { useNavigate } from "react-router-dom";

export const ProjectDetail = () => {
  const navigate = useNavigate();
  const projectContext = useContext(ProjectContext);

  const projectTabs: TabsProps["items"] = [
    { key: "1", label: "Overview", children: <Overview /> },
    { key: "2", label: "Setting", children: <Settings /> },
  ];
  useEffect(() => {
    if (!projectContext || projectContext?.projectName === "") {
      navigate("/projects");
    }
  }, []);
  return (
    <div className="w-full h-full px-3 pt-6">
      <h6 className="text-sm">{projectContext?.projectName}</h6>
      <span>
        <h4 className="text-2xl font-bold mb-3">Code Analysis</h4>
      </span>
      <div className="h-5/6 w-full">
        <Tabs
          className="bg-white h-full px-3 py-3"
          defaultActiveKey="1"
          items={projectTabs}
        />
      </div>
    </div>
  );
};
