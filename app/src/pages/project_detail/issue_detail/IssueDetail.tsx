import SyntaxHighlighter from "react-syntax-highlighter";
import { IIssue } from "../interface";
import { Tabs, type TabsProps } from "antd";
import {
  dark,
  monokaiSublime,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactDiffViewer from "react-diff-viewer";

interface IIssueDetailProps {
  issue: IIssue | undefined;
}
export const IssueDetail = (props: IIssueDetailProps) => {
  const { issue } = props;
  const issueDetailTabs: TabsProps["items"] = [
    {
      key: "1",
      label: "Origin",
      children: (
        <div>
          <SyntaxHighlighter
            language="cpp"
            wrapLines={true}
            showLineNumbers
            lineProps={(lineNumber) =>
              lineNumber === issue?.line
                ? { style: { backgroundColor: "yellow" } }
                : {}
            }
            startingLineNumber={issue?.function.start_line}
          >
            {issue?.function.code || ""}
          </SyntaxHighlighter>
        </div>
      ),
    },
    {
      key: "2",
      label: "Fix suggestion",
      children: (
        <div>
          <ReactDiffViewer
            oldValue={issue?.function.code || ""}
            newValue={issue?.fix_suggestion.fixed_code || ""}
            linesOffset={
              issue?.function.start_line ? issue?.function.start_line - 1 : 0
            }
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Tabs
        className="bg-white h-full px-3 py-3"
        defaultActiveKey="1"
        items={issueDetailTabs}
      />
    </div>
  );
};
