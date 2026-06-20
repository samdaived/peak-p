import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Shield } from 'lucide-react';

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-2">{t.about.subtitle}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t.about.title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
            {t.about.description}
          </p>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="glass-card rounded-2xl p-8 shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 shadow-soft">
                <Target className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{t.about.mission}</h3>
              <p className="text-muted-foreground">{t.about.missionText}</p>
            </div>

            {/* Quality Card */}
            <div className="glass-card rounded-2xl p-8 shadow-card hover:shadow-lg transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center mb-6 shadow-gold">
                <Shield className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{t.about.quality}</h3>
              <p className="text-muted-foreground">{t.about.qualityText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
