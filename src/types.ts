export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl?: string;
  imageBg?: string;
  specDetails?: {
    overview: string;
    keyFeatures: string[];
    rtlWaveformSummary?: string;
    flowOrMetrics?: { label: string; value: string }[];
    verilogSnippet?: string;
  };
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

export interface JourneyStep {
  stage: string;
  label: string;
  description: string;
}

export interface WorkExperienceItem {
  id: string;
  role: string;
  company: string;
  period?: string;
  location?: string;
  domain: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
}
