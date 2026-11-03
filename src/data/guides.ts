export interface Guide {
  id: string;
  title: string;
  description: string;
  /** Path under /public, e.g. '/guides/estate-planning-guide.pdf' */
  file: string;
  /** Optional cover image path under /public */
  cover?: string;
  /** Optional author line, e.g. 'Kirill Muchnik, Esq.' */
  author?: string;
  /** Optional year or edition label shown on the card */
  edition?: string;
}

export const guides: Guide[] = [
  {
    id: 'medicaid-application-checklist',
    title: 'The Medicaid Application Checklist: New York and New Jersey',
    description: `A free guide for families on what to gather before applying for nursing home Medicaid in New York or New Jersey. Both states review the five years before an application, and a file submitted with missing records can be delayed or denied within days. Collecting the right documentation first is the most effective way to speed up the process and secure eligibility.

The checklist walks through every document you will need, covering the applicant, income, assets, transfers and gifts in the last five years, rules for married couples, the facility and care, where the application is filed and how long it takes, and the mistakes that most often delay or sink applications. It also includes a side-by-side comparison of the 2026 New York and New Jersey rules on look-back periods, income limits, spousal allowances, and retirement accounts.`,
    file: '/guides/medicaid-application-checklist-ny-nj.pdf',
    cover: '/images/guides/medicaid-application-checklist-cover.jpg',
    author: 'Muchnik Elder Law P.C.',
    edition: '2026 Edition',
  },
];
