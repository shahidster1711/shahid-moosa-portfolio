export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  tags: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  logo?: string;
}

export interface PhilosophyPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedIn: string;
  github?: string;
  tagline: string;
}

export interface SymptomMapping {
  symptom: string;
  signals: string;
  cause: string;
  confidence: number;
}

export interface DecisionNode {
  step: string;
  options: { label: string; next: string }[];
}

export interface DeepDiveModule {
  title: string;
  indicators: string[];
  rootCauses?: string[];
  fixes?: string[];
  steps?: string[];
}

export interface Heuristic {
  rule: number;
  title: string;
  detail: string;
}

export interface IncidentCategory {
  label: string;
  color: "red" | "orange" | "yellow" | "blue";
  examples: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  period: string;
  type: string;
  status: "Live" | "In Progress";
  url?: string;
}

export interface RunbookData {
  incidentCategories: IncidentCategory[];
  symptomMappings: Record<string, SymptomMapping[]>;
  decisionTree: DecisionNode[];
  deepDiveModules: DeepDiveModule[];
  heuristics: Heuristic[];
}
