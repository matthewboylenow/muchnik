import { practiceAreas } from './practiceAreas';

export const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    children: [
      { name: 'The Firm', href: '/about/the-firm' },
      { name: 'Testimonials', href: '/about/testimonials' },
      { name: 'Our Team', href: '/about/our-team' },
      { name: 'Careers', href: '/about/careers' },
    ]
  },
  {
    name: 'Practice Areas',
    href: '/practice-areas',
    children: practiceAreas.map(area => ({
      name: area.title,
      href: `/practice-areas/${area.id}`,
    }))
  },
  { name: 'Blog', href: '/blog' },
  { name: 'Videos', href: '/videos' },
  { name: 'Contact', href: '/contact' },
];
