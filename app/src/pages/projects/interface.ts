export interface IProject {
  _id: string;
  creator: string;
  project_name: string;
  code_standard?: string;
  violation_summary?: string;
}
