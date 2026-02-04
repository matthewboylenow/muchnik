import { Metadata } from 'next';
import Image from 'next/image';
import { teamMembers } from '@/data/teamMembers';
import { Card, CardTitle, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Our Team | About Us',
  description:
    'Meet the experienced attorneys and staff at Muchnik Elder Law P.C. who are dedicated to serving families across New York and New Jersey.',
};

export default function OurTeamPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
            alt="Our Team"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative container-custom py-20 md:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Our Team
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
              Meet the dedicated professionals committed to serving your family's legal needs.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
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
    </div>
  );
}
