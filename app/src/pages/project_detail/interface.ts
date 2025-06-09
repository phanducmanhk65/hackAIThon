export interface IIssue {
  project_id: string;
  file: string;
  line: number;
  rule_id: string;
  message: string;
  severity: "critical" | "high" | "medium" | "low";
  function: IIssueFunction;
  fix_suggestion: IFixSuggestion;
}

interface IIssueFunction {
  start_line: number;
  end_line: number;
  code: string;
}

interface IFixSuggestion {
  fixed_code: string;
  explanation: string;
}
