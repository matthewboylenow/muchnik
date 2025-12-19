import { practiceAreas } from './practiceAreas';

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Practice Areas',
    href: '/practice-areas',
    children: practiceAreas.map(area => ({
      name: area.title,
      href: `/practice-areas/${area.id}`,
      description: area.shortDescription
    }))
  },
  { name: 'Blog', href: '/blog' },
  { name: 'Videos', href: '/videos' },
  { name: 'Contact', href: '/contact' },
];
