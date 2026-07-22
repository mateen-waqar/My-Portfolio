export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
};

// TODO: confirm graduation year and CGPA once available.
export const EDUCATION: EducationItem[] = [
  {
    id: "comsats-bscs",
    degree: "BS Software Engineering",
    institution: "COMSATS University Islamabad, Lahore Campus",
    institutionUrl: "https://www.cuilahore.edu.pk",
    period: "2024 — Present",
    location: "Lahore, Pakistan",
    description: "",
    highlights: [],
  },
  {
    id: "intermediate",
    degree: "FSc Pre-Engineering",
    institution: "Punjab Group of Colleges",
    period: "2022 — 2024",
    location: "Lahore, Pakistan",
    description: "",
    highlights: [],
  },
  {
    id: "matriculation",
    degree: "Matriculation",
    institution: "LDA Model High School, Sabzazar",
    period: "2020 — 2022",
    location: "Lahore, Pakistan",
    description: "",
    highlights: [],
  },
];
