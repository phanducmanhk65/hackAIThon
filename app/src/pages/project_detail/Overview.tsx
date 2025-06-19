import { Button, Collapse, Modal, Tag, App, type CollapseProps } from "antd";
import { Checkbox, Col, Row } from "antd";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../../context/ProjectContext";
import { get } from "../../func/crud_request";
import { IIssue } from "./interface";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { IssueDetail } from "./issue_detail/IssueDetail";
import { useNavigate } from "react-router-dom";
export const Overview = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const projectContext = useContext(ProjectContext);
  const [listIssues, setListIssues] = useState<IIssue[]>([]);
  const [currentIssue, setCurrentIssue] = useState<IIssue>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [listViolation, setListViolation] = useState<string[]>([]);
  const [listCheckedSeverity, setListCheckedSeverity] = useState<string[]>([
    "critical",
    "high",
    "medium",
    "low",
  ]);
  const [listCheckedViolation, setListCheckedViolation] = useState<string[]>(
    []
  );
  const checkboxItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "SEVERITY",
      children: (
        <Row className="font-normal">
          {["critical", "high", "medium", "low"].map((item) => {
            return (
              <Col span={24} className="mb-2">
                <Checkbox
                  defaultChecked
                  value={item}
                  onChange={(e) => {
                    handleCheckSeverity(e.target.checked, item);
                  }}
                >
                  {item.toUpperCase()}
                </Checkbox>
              </Col>
            );
          })}
        </Row>
      ),
    },
    {
      key: "2",
      label: "ISSUE TYPE",
      children: (
        <Row className="font-normal">
          {listViolation.map((item) => {
            return (
              <Col span={24} className="mb-2">
                <Checkbox
                  defaultChecked
                  onChange={(e) => {
                    handleCheckViolationType(e.target.checked, item);
                  }}
                >
                  {item}
                </Checkbox>
              </Col>
            );
          })}
        </Row>
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

  const handleCheckViolationType = (isChecked: boolean, type: string) => {
    let newListViolation = [...listCheckedViolation];
    if (isChecked) {
      if (!newListViolation.includes(type)) {
        newListViolation = [...newListViolation, type];
      }
    } else {
      newListViolation = newListViolation.filter((item) => item !== type);
    }
    setListCheckedViolation((prev) => {
      return newListViolation;
    });
  };

  const handleCheckSeverity = (isChecked: boolean, type: string) => {
    let newCheckSeverityList = [...listCheckedSeverity];
    if (isChecked) {
      if (!newCheckSeverityList.includes(type)) {
        newCheckSeverityList = [...newCheckSeverityList, type];
      }
    } else {
      newCheckSeverityList = newCheckSeverityList.filter(
        (item) => item !== type
      );
    }
    setListCheckedSeverity(newCheckSeverityList);
  };

  const isViolationTypeChecked = (type: string) => {
    return listCheckedViolation.includes(type);
  };

  const isSeverityTypeChecked = (type: string) => {
    return listCheckedSeverity.includes(type);
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

  useEffect(() => {
    async function getViolationStandard() {
      if (projectContext?.codeStandard) {
        const result = await get(
          `code_standard/get_all_violation_type/${projectContext?.codeStandard}`
        );
        if (Array.isArray(result)) {
          const newViolationTypeList = result.map((item) => {
            return item.violation_id;
          });
          setListViolation((prev) => {
            return newViolationTypeList;
          });
          setListCheckedViolation((prev) => {
            return newViolationTypeList;
          });
        }
      }
    }
    getViolationStandard();
  }, [projectContext?.codeStandard]);

  return (
    <div className="flex justify-between">
      <div className="h-96 w-1/5 mb-5 rounded-sm overflow-y-scroll">
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
        <div className="flex justify-end mb-2">
          <Button
            hidden={listIssues.length === 0}
            onClick={() => {
              message.success("Navigating to create pull request page!", 1);
              navigate("/project/create-pull-request");
            }}
            className=" bg-[#b30e3c] rounded-[5px] text-white"
          >
            Fix these issues
          </Button>
        </div>
        {listIssues.map((item) => {
          return (
            isViolationTypeChecked(item.rule_id) &&
            isSeverityTypeChecked(item.severity) && (
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
            )
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
