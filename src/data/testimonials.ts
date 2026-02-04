export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date?: string;
  source?: string;
}

// Add testimonials here. Each testimonial should have a unique id.
// To add a new testimonial, copy the template below and fill in the details:
//
// {
//   id: 'unique-id',
//   name: 'Client Name',
//   rating: 5,
//   text: 'The review text goes here...',
//   date: 'January 2024',
//   source: 'Google',
// },

export const testimonials: Testimonial[] = [
  // Testimonials will be added here
  // Example:
  // {
  //   id: 'review-1',
  //   name: 'John D.',
  //   rating: 5,
  //   text: 'Kirill and his team were incredibly helpful during a difficult time...',
  //   date: 'December 2024',
  //   source: 'Google',
  // },
];
