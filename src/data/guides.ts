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

export const guides: Guide[] = [];
