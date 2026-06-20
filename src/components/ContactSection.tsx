import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MapPin, Globe } from 'lucide-react';

export const ContactSection = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: t.contact.email,
      value: 'service@peaknutritions.com',
      href: 'mailto:service@peaknutritions.com',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: t.contact.location,
      value: t.contact.locationValue,
      href: null,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: t.contact.website,
      value: 'www.peaknutritions.com',
      href: 'https://www.peaknutritions.com',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        {/* Contact Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 text-center shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground shadow-soft">
                  {info.icon}
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">{info.label}</p>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-foreground font-semibold hover:text-primary transition-colors break-all"
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-foreground font-semibold break-all">{info.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
