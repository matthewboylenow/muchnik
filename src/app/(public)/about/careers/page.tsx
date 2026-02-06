import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';
import { CareerApplicationForm } from '@/components/sections/CareerApplicationForm';

export const metadata: Metadata = {
  title: 'Careers | About Us',
  description:
    'Join Muchnik Elder Law P.C. - We seek motivated professionals who value high-quality work, collaboration, and continuous learning.',
};

const benefits = [
  {
    title: 'Professional Development',
    description: 'We support your growth through ongoing training, mentorship, and opportunities to expand your skills and responsibilities.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
  },
  {
    title: 'Team Oriented Culture',
    description: 'Our attorneys and staff work closely together, fostering an environment where ideas are shared, questions are welcomed, and success is a collective effort.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
  },
  {
    title: 'Diverse Practice Areas',
    description: 'Team members gain exposure to a broad range of practice areas, including elder law, estate planning, estate administration, Surrogate\'s Court practice and litigation, special needs planning, guardianships, real estate, and related matters.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    ),
  },
  {
    title: 'Client Focused Work',
    description: 'Our practice is centered on helping individuals and families navigate significant life events. Our work has a direct and lasting impact on the people we serve.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    ),
  },
];

const positions = [
  'Attorney',
  'Paralegal',
  'Legal Assistant',
  'Finance Manager',
  'Administrative, HR, Operations',
  'Marketing',
  'IT Support',
  'Interns',
  'Virtual Assistants',
];

export default function CareersPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&q=80"
            alt="Careers at Muchnik Elder Law"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              Join Our Team of Dedicated Legal Professionals
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg">
              <p className="text-lg md:text-xl text-charcoal leading-relaxed">
                Muchnik Elder Law P.C. is committed to professionalism, integrity, and a team-oriented culture that prioritizes meaningful results for our clients. We seek motivated professionals who value high-quality work, collaboration, and continuous learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="h-full">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {benefit.icon}
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                    <CardContent>{benefit.description}</CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-8 text-center">
              Current Openings
            </h2>
            <p className="text-lg text-charcoal text-center mb-8">
              We welcome interest from candidates at all experience levels for roles such as:
            </p>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {positions.map((position) => (
                  <li key={position} className="flex items-center gap-2 text-charcoal">
                    <svg className="w-5 h-5 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {position}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-center text-charcoal mt-8">
              Even if your preferred position isn't currently listed, we encourage you to submit your application for future consideration.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Application Form
              </h2>
              <p className="text-xl text-gray-100 mb-4">
                Interested in joining our dedicated team?
              </p>
              <p className="text-lg text-gray-200">
                Please complete and submit the form below. A member of our hiring team will be in touch if your qualifications match our current needs.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg">
              <CareerApplicationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
