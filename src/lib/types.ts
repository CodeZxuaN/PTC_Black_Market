export type ResourceCategory =
  | 'Math'
  | 'Programming'
  | 'Civil Welfare'
  | 'IT Fundamentals'
  | 'Discrete Structures'
  | 'Pateros History'
  | 'Pathfit'
  | 'Understanding the Self'
  | 'Komunikasyon';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  content: string; // The full text for summarization
  link?: string;
}
