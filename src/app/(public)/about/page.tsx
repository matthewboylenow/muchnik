import { Metadata } from 'next';
import Image from 'next/image';
import { teamMembers } from '@/data/teamMembers';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about the experienced team at Muchnik Elder Law P.C. and our commitment to serving families across New York and New Jersey.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-navy text-white py-16">
        <div className="container-custom">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">About Our Firm</h1>
          <p className="text-lg text-gray-200 max-w-3xl">
            For more than 30 years, Muchnik Elder Law P.C. has been dedicated to helping families
            navigate the complexities of Elder Law, Estate Planning, and Medicaid Planning.
          </p>
        </div>
      </section>

      {/* Firm Overview */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-navy mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-charcoal space-y-4">
              <p>
                Muchnik Elder Law P.C. was founded with a simple mission: to provide compassionate,
                expert legal guidance to families facing the challenges of aging and estate
                planning.
              </p>
              <p>
                Our firm specializes in Elder Law, Medicaid Planning, Estate Planning, Special Needs
                Planning, Guardianships, and Real Estate. We understand that these areas of law can
                be complex and overwhelming, which is why we take the time to educate our clients
                and guide them through every step of the process.
              </p>
              <p>
                With offices in Staten Island, Manhattan, and New Jersey, we serve families
                throughout the tri-state area. Our multilingual staff can assist clients in English,
                Russian, and Ukrainian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
            Our Team
          </h2>

          <div className="space-y-12">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <div className={`grid grid-cols-1 ${member.image ? 'md:grid-cols-[200px,1fr]' : ''} gap-6`}>
                  {member.image && (
                    <div className="flex justify-center md:justify-start">
                      <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {member.name}
                      {member.isDeceased && ' †'}
                    </CardTitle>
                    <p className="text-gold font-semibold mb-4">{member.title}</p>
                    <CardContent>
                      {member.bio.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-12 text-center">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <CardTitle className="mb-3">Compassion</CardTitle>
              <CardContent>
                We treat every client with empathy and understanding, recognizing the emotional
                challenges they face.
              </CardContent>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <CardTitle className="mb-3">Integrity</CardTitle>
              <CardContent>
                We maintain the highest ethical standards and always act in our clients' best
                interests.
              </CardContent>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <CardTitle className="mb-3">Excellence</CardTitle>
              <CardContent>
                We strive for excellence in everything we do, continually expanding our knowledge
                and skills.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
