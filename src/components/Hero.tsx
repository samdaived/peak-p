import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export const Hero = () => {
  const { t, direction } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 backdrop-blur-sm mb-6 animate-fade-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              {t.hero.tagline}
            </span>
          </div>

          {/* Title */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Button 
              size="lg" 
              className="gradient-primary hover:opacity-90 shadow-soft text-primary-foreground px-8"
              asChild
            >
              <a href="#products">{t.hero.cta}</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/30 hover:bg-accent"
              asChild
            >
              <a href="#contact">{t.hero.ctaSecondary}</a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
