import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const AuthPages = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [language, setLanguage] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const translations = {
    en: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email Address',
      emailPlaceholder: 'Enter your academic email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      name: 'Full Name',
      namePlaceholder: 'Enter your full name',
      role: 'Academic Role',
      author: 'Author/Researcher',
      reviewer: 'Peer Reviewer',
      reader: 'Reader',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      createAccount: 'Sign Up',
      welcomeBack: 'Welcome Back',
      welcomeNew: 'Create Account',
      subtitle: 'Research Publication Platform',
      tagline: 'Bridging Knowledge Across Languages'
    },
    bn: {
      login: 'লগইন',
      signup: 'নিবন্ধন',
      email: 'ইমেইল',
      emailPlaceholder: 'আপনার একাডেমিক ইমেইল লিখুন',
      password: 'পাসওয়ার্ড',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      confirmPasswordPlaceholder: 'পাসওয়ার্ড আবার লিখুন',
      name: 'পূর্ণ নাম',
      namePlaceholder: 'আপনার পূর্ণ নাম লিখুন',
      role: 'একাডেমিক ভূমিকা',
      author: 'লেখক/গবেষক',
      reviewer: 'পর্যালোচক',
      reader: 'পাঠক',
      noAccount: 'অ্যাকাউন্ট নেই?',
      hasAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
      createAccount: 'নিবন্ধন করুন',
      welcomeBack: 'পুনরায় স্বাগতম',
      welcomeNew: 'অ্যাকাউন্ট তৈরি করুন',
      subtitle: 'গবেষণা প্রকাশনা প্ল্যাটফর্ম',
      tagline: 'ভাষার সীমানা অতিক্রম করে জ্ঞানের সেতুবন্ধন'
    }
  };

  const t = translations[language];

  const styles = {
    logo: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700
    },
    heading: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 500
    },
    body: {
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 400
    }
  };

  const LoginForm = () => (
    <div className="w-full max-w-md px-4">
      <Card className="shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center" style={styles.heading}>
            {t.welcomeBack}
          </CardTitle>
          <p className="text-center text-gray-600 text-sm" style={styles.body}>
            {t.subtitle}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" style={styles.body}>
              {t.email}
            </label>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
              style={styles.body}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" style={styles.body}>
              {t.password}
            </label>
            <input
              type="password"
              placeholder={t.passwordPlaceholder}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
              style={styles.body}
              required
            />
          </div>
          <button 
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            style={styles.heading}
          >
            {t.login}
          </button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-gray-600" style={styles.body}>
            {t.noAccount}{' '}
            <button
              onClick={() => setCurrentPage('signup')}
              className="text-blue-600 hover:text-blue-700 font-medium"
              style={styles.heading}
            >
              {t.createAccount}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );

  const SignupForm = () => (
    <div className="w-full max-w-md px-4">
      <Card className="shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center" style={styles.heading}>
            {t.welcomeNew}
          </CardTitle>
          <p className="text-center text-gray-600 text-sm" style={styles.body}>
            {t.subtitle}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" style={styles.body}>
              {t.name}
            </label>
            <input
              type="text"
              placeholder={t.namePlaceholder}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
              style={styles.body}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" style={styles.body}>
              {t.email}
            </label>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
              style={styles.body}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" style={styles.body}>
              {t.role}
            </label>
            <select 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
              style={styles.body}
              defaultValue=""
            >
              <option value="" disabled>{language === 'en' ? 'Select your role' : 'আপনার ভূমিকা নির্বাচন করুন'}</option>
              <option value="author">{t.author}</option>
              <option value="reviewer">{t.reviewer}</option>
              <option value="reader">{t.reader}</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" style={styles.body}>
              {t.password}
            </label>
            <input
              type="password"
              placeholder={t.passwordPlaceholder}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
              style={styles.body}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" style={styles.body}>
              {t.confirmPassword}
            </label>
            <input
              type="password"
              placeholder={t.confirmPasswordPlaceholder}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-base"
              style={styles.body}
              required
            />
          </div>
          <button 
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            style={styles.heading}
          >
            {t.signup}
          </button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-gray-600" style={styles.body}>
            {t.hasAccount}{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="text-blue-600 hover:text-blue-700 font-medium"
              style={styles.heading}
            >
              {t.login}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Language Switcher */}
      <div className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-600 p-2 rounded hover:bg-gray-100"
              style={styles.body}
              onClick={() => setShowLangMenu(!showLangMenu)}
            >
              <Globe className="w-5 h-5" />
              <span>{language === 'en' ? 'English' : 'বাংলা'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded shadow-lg border">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  style={styles.body}
                  onClick={() => {
                    setLanguage('en');
                    setShowLangMenu(false);
                  }}
                >
                  English
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  style={styles.body}
                  onClick={() => {
                    setLanguage('bn');
                    setShowLangMenu(false);
                  }}
                >
                  বাংলা
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] py-8">
        <div className="text-center mb-8">
          <h1 
            className="text-4xl sm:text-5xl mb-3 text-blue-600"
            style={styles.logo}
          >
            {language === 'en' ? 'BanguJournal' : 'বাংগু জার্নাল'}
          </h1>
          <p 
            className="text-gray-600 text-sm sm:text-base"
            style={styles.body}
          >
            {t.tagline}
          </p>
        </div>
        {currentPage === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};

export default AuthPages;
