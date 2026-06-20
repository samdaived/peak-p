import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { login } from '@/lib/buyerAuth';
import { toast } from '@/hooks/use-toast';

const copy = {
  en: {
    title: 'Buyer Login',
    subtitle: 'Peak Nutrition Health & Wellness',
    username: 'Username',
    password: 'Password',
    submit: 'Sign in',
    back: '← Back to site',
    admin: 'Admin access',
    welcome: 'Welcome',
    invalid: 'Invalid credentials',
  },
  fr: {
    title: 'Connexion Acheteur',
    subtitle: 'Peak Nutrition Health & Wellness',
    username: "Nom d'utilisateur",
    password: 'Mot de passe',
    submit: 'Se connecter',
    back: '← Retour au site',
    admin: 'Accès administrateur',
    welcome: 'Bienvenue',
    invalid: 'Identifiants invalides',
  },
  ar: {
    title: 'تسجيل دخول المشتري',
    subtitle: 'بيك نيوتريشن للصحة والعافية',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    submit: 'تسجيل الدخول',
    back: '← العودة إلى الموقع',
    admin: 'دخول المسؤول',
    welcome: 'مرحباً',
    invalid: 'بيانات الاعتماد غير صحيحة',
  },
};

const Login = () => {
  const navigate = useNavigate();
  const { language, direction } = useLanguage();
  const c = copy[language] ?? copy.en;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = login(username.trim(), password);
    if (account) {
      toast({ title: `${c.welcome}, ${account.companyName}` });
      navigate('/prices');
    } else {
      toast({ title: c.invalid, variant: 'destructive' });
    }
  };

  return (
    <div dir={direction} className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 pt-24 md:pt-28">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">{c.title}</h1>
            <p className="text-sm text-muted-foreground">{c.subtitle}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{c.username}</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{c.password}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">{c.submit}</Button>
          </form>
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <Link to="/" className="hover:text-primary block">{c.back}</Link>
            <Link to="/admin" className="hover:text-primary block">{c.admin}</Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
