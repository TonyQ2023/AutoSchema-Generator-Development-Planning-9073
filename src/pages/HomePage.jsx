import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCode, FiSearch, FiTrendingUp, FiShield, FiArrowRight, FiCheck } = FiIcons;

const HomePage = () => {
  const features = [
    {
      icon: FiCode,
      title: 'Schema.org Compliant',
      description: 'Generate accurate markup following the latest Schema.org standards for automotive businesses.'
    },
    {
      icon: FiSearch,
      title: 'SEO Optimized',
      description: 'Improve your dealership\'s visibility in local search results and Google Business listings.'
    },
    {
      icon: FiTrendingUp,
      title: 'Rich Results',
      description: 'Enable rich snippets in search results to stand out from competitors.'
    },
    {
      icon: FiShield,
      title: 'Validated Output',
      description: 'Built-in validation ensures your markup meets Google\'s requirements.'
    }
  ];

  const benefits = [
    'Improved local search visibility',
    'Better click-through rates',
    'Enhanced Google Business Profile',
    'Professional structured data',
    'No technical knowledge required',
    'Free to use, no account needed'
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Generate Schema Markup for
              <span className="text-primary-600 block">Car Dealerships</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Create accurate Schema.org markup to improve your dealership's SEO, local search visibility, 
              and Google Business Profile performance. No technical knowledge required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/builder"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
              >
                <span>Start Building Schema</span>
                <SafeIcon icon={FiArrowRight} className="text-sm" />
              </Link>
              
              <Link
                to="/resources"
                className="text-primary-600 hover:text-primary-700 px-8 py-3 rounded-lg font-semibold border border-primary-200 hover:border-primary-300 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Schema Markup Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Structured data helps search engines understand your business better, 
              leading to improved visibility and more qualified leads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="text-primary-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Boost Your Dealership's Online Presence
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our tool generates comprehensive Schema.org markup specifically designed for 
                automotive businesses, helping you stand out in local search results.
              </p>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiCheck} className="text-green-600 text-xs" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="whitespace-pre-wrap">
{`{
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Your Dealership Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345"
  },
  "telephone": "+1-555-123-4567",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ]
}`}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Example of generated Schema markup for your dealership
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Improve Your SEO?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start generating professional Schema markup for your car dealership today. 
            It's free, fast, and requires no technical expertise.
          </p>
          <Link
            to="/builder"
            className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2 transition-colors"
          >
            <span>Get Started Now</span>
            <SafeIcon icon={FiArrowRight} className="text-sm" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;