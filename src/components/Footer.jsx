import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiExternalLink } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              About AutoSchema
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Generate accurate Schema.org markup for car dealerships to improve SEO and local search visibility.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://schema.org/AutoDealer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary-600 flex items-center space-x-1"
                >
                  <span>Schema.org AutoDealer</span>
                  <SafeIcon icon={FiExternalLink} className="text-xs" />
                </a>
              </li>
              <li>
                <a
                  href="https://developers.google.com/search/docs/appearance/structured-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary-600 flex items-center space-x-1"
                >
                  <span>Google Structured Data</span>
                  <SafeIcon icon={FiExternalLink} className="text-xs" />
                </a>
              </li>
              <li>
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary-600 flex items-center space-x-1"
                >
                  <span>Rich Results Test</span>
                  <SafeIcon icon={FiExternalLink} className="text-xs" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Support
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Free tool for automotive professionals. No account required.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <SafeIcon icon={FiHeart} className="text-accent-500 text-xs" />
            <span>for the automotive industry</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;