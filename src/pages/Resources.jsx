import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiExternalLink, FiBookOpen, FiCode, FiTool, FiHelpCircle, FiVideo } = FiIcons;

const Resources = () => {
  const sections = [
    {
      title: 'Schema.org Documentation',
      icon: FiBookOpen,
      resources: [
        {
          title: 'AutoDealer Schema Type',
          description: 'Official documentation for the AutoDealer schema type',
          url: 'https://schema.org/AutoDealer',
          type: 'documentation'
        },
        {
          title: 'AutomotiveBusiness Schema',
          description: 'Parent type for automotive businesses',
          url: 'https://schema.org/AutomotiveBusiness',
          type: 'documentation'
        },
        {
          title: 'LocalBusiness Properties',
          description: 'Common properties for local businesses',
          url: 'https://schema.org/LocalBusiness',
          type: 'documentation'
        },
        {
          title: 'OpeningHoursSpecification',
          description: 'How to properly structure business hours',
          url: 'https://schema.org/OpeningHoursSpecification',
          type: 'documentation'
        }
      ]
    },
    {
      title: 'Google Guidelines',
      icon: FiCode,
      resources: [
        {
          title: 'Structured Data Guidelines',
          description: 'Google\'s official structured data guidelines',
          url: 'https://developers.google.com/search/docs/appearance/structured-data',
          type: 'guide'
        },
        {
          title: 'Local Business Markup',
          description: 'Best practices for local business structured data',
          url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business',
          type: 'guide'
        },
        {
          title: 'Vehicle Listings',
          description: 'Guidelines for vehicle inventory markup',
          url: 'https://developers.google.com/search/docs/appearance/structured-data/vehicle-listing',
          type: 'guide'
        }
      ]
    },
    {
      title: 'Validation Tools',
      icon: FiTool,
      resources: [
        {
          title: 'Rich Results Test',
          description: 'Test your markup with Google\'s official tool',
          url: 'https://search.google.com/test/rich-results',
          type: 'tool'
        },
        {
          title: 'Schema Markup Validator',
          description: 'Validate your Schema.org markup',
          url: 'https://validator.schema.org/',
          type: 'tool'
        },
        {
          title: 'Structured Data Testing Tool',
          description: 'Google\'s legacy testing tool (still useful)',
          url: 'https://search.google.com/structured-data/testing-tool',
          type: 'tool'
        }
      ]
    },
    {
      title: 'Implementation Guides',
      icon: FiVideo,
      resources: [
        {
          title: 'JSON-LD Implementation',
          description: 'How to implement JSON-LD in your website',
          url: 'https://json-ld.org/learn.html',
          type: 'tutorial'
        },
        {
          title: 'Google My Business Integration',
          description: 'Sync your schema data with Google My Business',
          url: 'https://support.google.com/business/answer/3038177',
          type: 'tutorial'
        }
      ]
    }
  ];

  const faqs = [
    {
      question: 'What is Schema.org markup?',
      answer: 'Schema.org markup is a structured data vocabulary that helps search engines understand your website content better. For car dealerships, it provides specific information about your business, location, services, and inventory.'
    },
    {
      question: 'Why is structured data important for dealerships?',
      answer: 'Structured data helps your dealership appear in rich search results, improves local SEO visibility, and provides better information to potential customers directly in search results.'
    },
    {
      question: 'How do I implement the generated schema?',
      answer: 'Add the JSON-LD code to your website\'s <head> section or before the closing </body> tag. Most content management systems allow you to add custom code through their admin interface.'
    },
    {
      question: 'Do I need technical knowledge to use this tool?',
      answer: 'No! This tool is designed for non-technical users. Simply fill out the form with your business information, and we\'ll generate the proper markup code for you.'
    },
    {
      question: 'How often should I update my schema markup?',
      answer: 'Update your schema markup whenever your business information changes, such as hours, address, phone number, or services offered. Regular updates help maintain accuracy.'
    },
    {
      question: 'Can I use this for multiple dealership locations?',
      answer: 'Yes! Create separate schemas for each location to ensure accurate local SEO for all your dealership branches.'
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'documentation': return 'text-blue-600 bg-blue-50';
      case 'guide': return 'text-green-600 bg-green-50';
      case 'tool': return 'text-purple-600 bg-purple-50';
      case 'tutorial': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resources & Documentation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Schema.org markup for car dealerships, implementation guides, and best practices.
          </p>
        </div>

        {/* Resource Sections */}
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={section.icon} className="text-primary-600 text-sm" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.resources.map((resource, index) => (
                  <motion.a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (index * 0.05) }}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                          {resource.title}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                      </div>
                      <SafeIcon icon={FiExternalLink} className="text-gray-400 group-hover:text-primary-600 text-sm transition-colors" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {resource.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiHelpCircle} className="text-primary-600 text-sm" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Implementation Example */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Implementation Example
            </h3>
            <p className="text-gray-600 mb-6">
              Here's how to add your generated schema markup to your website:
            </p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="text-gray-500 mb-2">{'<!-- Add this to your website\'s <head> section -->'}</div>
              <div className="whitespace-pre-wrap">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Your Dealership Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Your City",
    "addressRegion": "Your State",
    "postalCode": "12345"
  },
  "telephone": "+1-555-123-4567",
  "department": [
    {
      "@type": "AutomotiveBusiness",
      "name": "Sales Department",
      "telephone": "+1-555-123-4000"
    },
    {
      "@type": "AutomotiveBusiness",
      "name": "Service Department",
      "telephone": "+1-555-123-5000",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "456 Service Road",
        "addressLocality": "Your City",
        "addressRegion": "Your State",
        "postalCode": "12345"
      }
    }
  ]
}
</script>`}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Resources;