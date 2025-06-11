import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { IProject } from "./interface";
import { get, post } from "../../func/crud_request";
import {
  Modal,
  Form,
  Select,
  Input,
  Upload,
  Button,
  Row,
  Col,
  App,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ProjectContext from "../../context/ProjectContext";

const { Option } = Select;
export const Projects = () => {
  const { message } = App.useApp();
  const projectContext = useContext(ProjectContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [listProject, setListProject] = useState<IProject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const handleUploadChange = ({ fileList }: any) => {
  //   console.log("Handle", fileList);
  //   if (fileList.length > 0) {
  //     const relPath = fileList[0].originFileObj?.webkitRelativePath;
  //     if (relPath) {
  //       const folderName = relPath.split("/")[0];
  //       // Set folder name to hidden field
  //       form.setFieldsValue({ folderName });
  //     }
  //   }
  // };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("project_name", values.project_name);
    formData.append("code_standard", values.code_standard);
    formData.append("creator", "manhpd19");
    console.log(values);
    values.source.fileList.forEach((file: any) => {
      formData.append("files", file.originFileObj, file.webkitRelativePath);
    });
    form.resetFields();
    try {
      const res = await post("project/add_project", formData);
      if (!res) throw new Error("Upload failed");
      if (res) {
        message.success("Add new project successfully!");
        const listProj = await get("project/get_all_project/manhpd19");
        setListProject((prevState) => {
          return listProj;
        });
      }
      setIsModalOpen(false);
    } catch (err) {}
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const listProj = await get("project/get_all_project/manhpd19");
      setListProject(listProj);
    }
    fetchData();
  }, []);
  return (
    <div className="w-full h-full px-6 py-6">
      <div className="font-sans mb-6">
        <span className="mx-4 text-base text-xl text-gray-500">
          Import and scan your project
        </span>
      </div>
      <div className="h-3/4 flex justify-start bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="h-full p-2 w-3/5 overflow-auto">
          {listProject.map((project) => {
            return (
              <div
                key={project.project_name}
                className=" px-1 py-1 m-auto mt-4 w-3/4 bg-teal-50 border border-gray-200 rounded-lg cursor-pointer"
                onClick={() => {
                  projectContext?.setProjectName(project.project_name);
                  projectContext?.setProjectId(project._id);
                  projectContext?.setCodeStandard(project.code_standard);
                  message.success(
                    `Navigating to ${projectContext?.projectName} detail page!`
                  );
                  navigate("/project/detail");
                }}
              >
                <div className="p-4 md:p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {project.project_name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-full w-2/5 bg-blue-50">
          <img
            alt=""
            className="h-full w-full object-contain md:object-cover rounded-lg"
            src="../../../project_page.jpg"
          />
        </div>
      </div>

      <div className="h-16 mt-6 flex justify-end">
        <button
          type="button"
          className="text-white h-30px bg-blue-500 hover:bg-blue-800 px-4 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none "
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add new project
        </button>
        <div>
          <Modal
            title="Add new Project"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            footer={null}
            onCancel={() => {
              setIsModalOpen(false);
            }}
          >
            <Form
              form={form}
              layout="vertical"
              style={{ maxWidth: 600 }}
              onFinish={(values) => handleSubmit(values)}
            >
              <Form.Item name="project_name" label="Project name">
                <Input />
              </Form.Item>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="source" label="Source">
                    <Upload
                      directory
                      multiple
                      beforeUpload={() => false}
                      // onChange={handleUploadChange}
                    >
                      <Button icon={<UploadOutlined />}>
                        Upload Directory
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="code_standard" label="Code standard">
                    <Select placeholder="Select a standard" allowClear>
                      <Option value="CERT">CERT</Option>
                      <Option value="MISRA">MISRA</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
};
