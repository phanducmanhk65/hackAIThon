import { Button, Collapse, Modal, Tag, type CollapseProps } from "antd";
import { Checkbox, Col, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../context/ProjectContext";
import { get } from "../../func/crud_request";
import { IIssue } from "./interface";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { IssueDetail } from "./issue_detail/IssueDetail";

export const Overview = () => {
  const projectContext = useContext(ProjectContext);
  const [listIssues, setListIssues] = useState<IIssue[]>([]);
  const [currentIssue, setCurrentIssue] = useState<IIssue>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const checkboxItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "SEVERITY",
      children: (
        <Checkbox.Group style={{ width: "100%" }} className="font-normal">
          <Row>
            <Col span={24}>
              <Checkbox value="high">High</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="medium">Medium</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="low">Low</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      ),
    },
    {
      key: "2",
      label: "ISSUE TYPE",
      children: (
        <Checkbox.Group style={{ width: "100%" }} className="font-normal">
          <Row>
            <Col span={24}>
              <Checkbox value="cert_1">CERT_1</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="cert_2">CERT_2</Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value="cert_3">CERT_3</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      ),
    },
  ];
  const getSeverityColor = (
    severity: "critical" | "high" | "medium" | "low"
  ) => {
    switch (severity) {
      case "critical":
        return "#fc0303";
      case "high":
        return "#fca503";
      case "medium":
        return "red";
      case "low":
        return "#108ee9";
    }
  };

  useEffect(() => {
    async function getListIssues() {
      if (projectContext?.projectId) {
        const listIssues = await get(
          `violation/get_all_violation/${projectContext.projectId}`
        );
        console.log("List Issue", listIssues);
        setListIssues(listIssues);
      }
    }
    getListIssues();
  }, [projectContext?.projectId]);

  return (
    <div className="flex justify-between">
      <div className="h-96 w-1/5 mb-5 rounded-sm">
        <Collapse
          className="border-none bg-teal-100 font-semibold rounded-none"
          items={checkboxItems}
          defaultActiveKey={["1", "2"]}
        />
      </div>
      <div
        className="h-96 w-4/5 rounded-sm border-l border-l-gray-200 border-t-0 border-r-0 border-b-0 overflow-y-auto
"
      >
        {listIssues.map((item) => {
          return (
            <div className="w-full overflow-x-hidden overflow-y-auto h-64 mb-4 p-2 bg-white border-t-4 border-red-500 border-b shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <div className="mb-2 flex justify-start">
                <h4 className="font-sans font-semibold text-xl mr-6">
                  {item.rule_id}
                </h4>
                <Tag
                  color={getSeverityColor(item.severity)}
                  className="flex justify-center items-center"
                >
                  {item.severity.toUpperCase()}
                </Tag>
              </div>
              <SyntaxHighlighter
                language="cpp"
                wrapLines={true}
                style={monokaiSublime}
                showLineNumbers
                lineProps={(lineNumber) =>
                  lineNumber === item.line
                    ? { style: { backgroundColor: "green" } }
                    : {}
                }
                startingLineNumber={item.function.start_line}
              >
                {item.function.code}
              </SyntaxHighlighter>
              <div className="mt-4">
                <div className="flex justify-start">
                  <span className="material-icons aligns-center text-red-600">
                    report
                  </span>
                  <p>{item.message}</p>
                </div>
                <div className="flex justify-end">
                  <Button
                    color="purple"
                    variant="solid"
                    onClick={() => {
                      setCurrentIssue(item);
                      setIsModalVisible(true);
                    }}
                  >
                    Detail
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        style={{ minWidth: "1000px" }}
        open={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            Close
          </Button>,
        ]}
      >
        <IssueDetail issue={currentIssue} />
      </Modal>
    </div>
  );
};
