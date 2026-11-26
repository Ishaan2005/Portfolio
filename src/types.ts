export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  year?: string;
  category?: string;
  scrapCode?: string;
  accent?: 'cobalt' | 'tomato' | 'butter' | 'pistachio';
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
  id: string;
  title: string;
  code: string;
  iconName: string;
  summary: string;
  skills: string[];
  featured?: boolean;
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

export interface EducationItem {
  degree: string;
  minor: string;
  institution: string;
  graduation: string;
  focus: string[];
}
