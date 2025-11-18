
import React from 'react';
import type { Page } from '../types';
import Button from '../components/Button';
import InteractiveGlobe from '../components/Globe';
import Card from '../components/Card';
import { CheckCircleIcon } from '../components/Icons';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {

  const features = [
    { title: "HS Code Finder", description: "Instantly find the correct HS codes for your products with our AI-powered search." },
    { title: "Export Country Ranker", description: "Discover the most profitable countries to export your products to, based on real-time data." },
    { title: "Pricing Intelligence", description: "Analyze market prices, calculate margins, and estimate logistics costs to stay competitive." },
    { title: "Risk Analyzer", description: "Assess political, economic, and logistical risks for any trade route before you ship." }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      title: 'Export Manager, TechCraft Industries',
      quote: "Exporizz helped us identify 5 new export markets we hadn't considered. Our revenue grew by 40% in just 6 months!",
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286de2?w=100&h=100&fit=crop&q=80',
    },
    {
      name: 'Rajesh Kumar',
      title: 'Founder, Organic Exports Ltd',
      quote: "The AI-powered insights are incredible. We saved hundreds of hours on market research and compliance checks.",
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&q=80',
    },
    {
      name: 'Sarah Williams',
      title: 'Logistics Director, Global Trade Co',
      quote: "The pricing intelligence feature gave us a competitive edge. We now quote accurately and win more contracts.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80',
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="hero-container relative h-screen w-full">
        <InteractiveGlobe />
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center p-4">
            <div className="max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white" style={{textShadow: '0px 2px 10px rgba(0,0,0,0.5)'}}>
                AI that makes
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-purple">exporting simple.</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl max-w-xl mx-auto text-brand-gray-200" style={{textShadow: '0px 1px 5px rgba(0,0,0,0.5)'}}>
                Exporizz is your intelligent partner for global trade, helping you discover opportunities, navigate compliance, and maximize profits with the power of AI.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setCurrentPage('Login')} size="lg" variant="primary">Start Export Analysis</Button>
                <Button onClick={() => setCurrentPage('Login')} size="lg" variant="secondary">View Pricing</Button>
                </div>
            </div>
        </div>
      </section>

      {/* The following sections provide content to scroll through, activating the hero animation */}
      <div className="relative z-20 bg-white dark:bg-brand-dark">
         {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-brand-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">Your Complete Export Toolkit</h2>
                <p className="mt-4 text-lg text-brand-gray-600 dark:text-brand-gray-400">Everything you need to succeed in the global market.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                <Card key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-brand-teal to-brand-purple text-white">
                    <CheckCircleIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-lg font-bold text-brand-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-base text-brand-gray-600 dark:text-brand-gray-400">{feature.description}</p>
                </Card>
                ))}
            </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-brand-gray-900 dark:text-white">Trusted by Exporters Worldwide</h2>
              <p className="mt-4 text-lg text-brand-gray-600 dark:text-brand-gray-400">See how businesses are growing with Exporizz.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white dark:bg-brand-gray-900 p-8 text-center flex flex-col items-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mb-6 border-4 border-brand-gray-200 dark:border-brand-gray-700" />
                  <div className="flex-grow">
                    <p className="text-lg text-brand-gray-700 dark:text-brand-gray-300 italic">"{testimonial.quote}"</p>
                  </div>
                  <footer className="mt-6">
                    <p className="font-bold text-lg text-brand-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-brand-gray-500 dark:text-brand-gray-400">{testimonial.title}</p>
                  </footer>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl p-8 md:p-12 text-center bg-brand-gray-900 overflow-hidden border border-brand-gray-800 shadow-2xl shadow-brand-purple/10">
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-brand-teal to-brand-purple opacity-10 animate-spin-slow"></div>
              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                  Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-purple">Transform</span> Your Exports?
                </h2>
                <p className="mt-4 text-lg text-brand-gray-300 max-w-2xl mx-auto">
                  Join thousands of exporters who are growing their business with Exporizz.
                </p>
                <div className="mt-8">
                  <Button size="lg" variant="primary" onClick={() => setCurrentPage('Create Account')}>
                    Get Started Free
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;