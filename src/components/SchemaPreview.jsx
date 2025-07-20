import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { generateSchema } from '../utils/schemaGenerator';

const { FiCopy, FiDownload, FiCheck, FiEye, FiCode } = FiIcons;

const SchemaPreview = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState('json-ld');

  const schema = useMemo(() => generateSchema(data), [data]);

  const formattedSchema = useMemo(() => {
    try {
      return JSON.stringify(schema, null, 2);
    } catch (error) {
      return '{}';
    }
  }, [schema]);

  const jsonLdScript = useMemo(() => {
    return `<script type="application/ld+json">\n${formattedSchema}\n</script>`;
  }, [formattedSchema]);

  const handleCopy = async () => {
    try {
      // Copy the JSON-LD script tag for JSON-LD format, otherwise just the formatted schema
      const textToCopy = format === 'json-ld' ? jsonLdScript : formattedSchema;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    // For JSON-LD format, include the script tags in the download
    const content = format === 'json-ld' ? jsonLdScript : formattedSchema;
    const fileExtension = format === 'json-ld' ? 'html' : 'json';
    const mimeType = format === 'json-ld' ? 'text/html' : 'application/json';
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.name || 'dealership'}-schema.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const validateSchema = () => {
    const errors = [];
    if (!data.name) errors.push('Business name is required');
    if (!data.url) errors.push('Website URL is required');
    if (!data.telephone) errors.push('Phone number is required');
    if (!data.address?.streetAddress) errors.push('Street address is required');
    if (!data.address?.addressLocality) errors.push('City is required');
    if (!data.address?.addressRegion) errors.push('State is required');
    if (!data.address?.postalCode) errors.push('ZIP code is required');
    return errors;
  };

  const validationErrors = validateSchema();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="json-ld">JSON-LD</option>
            <option value="microdata">Microdata</option>
            <option value="rdfa">RDFa</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
          >
            <SafeIcon icon={copied ? FiCheck : FiCopy} className="text-sm" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700 border border-primary-300 rounded-md hover:border-primary-400 transition-colors"
          >
            <SafeIcon icon={FiDownload} className="text-sm" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Validation Status */}
      {validationErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md"
        >
          <h4 className="text-sm font-medium text-amber-800 mb-2">
            Validation Issues:
          </h4>
          <ul className="text-sm text-amber-700 space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Schema Output */}
      <div className="flex-1 min-h-0">
        {format === 'json-ld' && (
          <div className="h-full">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-auto h-full font-mono">
              {jsonLdScript}
            </pre>
          </div>
        )}

        {format === 'microdata' && (
          <div className="h-full">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-auto h-full font-mono">
              {`<div itemscope itemtype="https://schema.org/AutoDealer">
  <h1 itemprop="name">${data.name || '[Business Name]'}</h1>
  <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <span itemprop="streetAddress">${data.address?.streetAddress || '[Street Address]'}</span>
    <span itemprop="addressLocality">${data.address?.addressLocality || '[City]'}</span>
    <span itemprop="addressRegion">${data.address?.addressRegion || '[State]'}</span>
    <span itemprop="postalCode">${data.address?.postalCode || '[ZIP]'}</span>
  </div>
  <span itemprop="telephone">${data.telephone || '[Phone]'}</span>
</div>`}
            </pre>
          </div>
        )}

        {format === 'rdfa' && (
          <div className="h-full">
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-auto h-full font-mono">
              {`<div vocab="https://schema.org/" typeof="AutoDealer">
  <h1 property="name">${data.name || '[Business Name]'}</h1>
  <div property="address" typeof="PostalAddress">
    <span property="streetAddress">${data.address?.streetAddress || '[Street Address]'}</span>
    <span property="addressLocality">${data.address?.addressLocality || '[City]'}</span>
    <span property="addressRegion">${data.address?.addressRegion || '[State]'}</span>
    <span property="postalCode">${data.address?.postalCode || '[ZIP]'}</span>
  </div>
  <span property="telephone">${data.telephone || '[Phone]'}</span>
</div>`}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span className={`flex items-center space-x-1 ${validationErrors.length === 0 ? 'text-green-600' : 'text-amber-600'}`}>
              <SafeIcon icon={validationErrors.length === 0 ? FiCheck : FiEye} className="text-sm" />
              <span>{validationErrors.length === 0 ? 'Valid Schema' : `${validationErrors.length} issues`}</span>
            </span>
          </div>
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
          >
            <span>Test in Google</span>
            <SafeIcon icon={FiCode} className="text-sm" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchemaPreview;