import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const { FiPlus, FiEdit, FiTrash2, FiDownload, FiCopy, FiCheck, FiMapPin } = FiIcons;

const SavedSchemas = () => {
  const [savedSchemas, setSavedSchemas] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    loadSavedSchemas();
  }, []);

  const loadSavedSchemas = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('autoschema_saved') || '[]');
      setSavedSchemas(saved);
    } catch (error) {
      console.error('Error loading saved schemas:', error);
      setSavedSchemas([]);
    }
  };

  const deleteSchema = (id) => {
    try {
      const updated = savedSchemas.filter(schema => schema.id !== id);
      setSavedSchemas(updated);
      localStorage.setItem('autoschema_saved', JSON.stringify(updated));
    } catch (error) {
      console.error('Error deleting schema:', error);
    }
  };

  const duplicateSchema = (schema) => {
    try {
      const newSchema = {
        ...schema,
        id: Date.now().toString(),
        name: `${schema.name} (Copy)`,
        updatedAt: new Date().toISOString()
      };
      
      const updated = [newSchema, ...savedSchemas];
      setSavedSchemas(updated);
      localStorage.setItem('autoschema_saved', JSON.stringify(updated));
    } catch (error) {
      console.error('Error duplicating schema:', error);
    }
  };

  const downloadSchema = (schema) => {
    try {
      const blob = new Blob([JSON.stringify(schema.data, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${schema.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-schema.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading schema:', error);
    }
  };

  const copySchema = async (schema) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(schema.data, null, 2));
      setCopiedId(schema.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Error copying schema:', error);
    }
  };

  // Get a summary of departments with separate locations
  const getDepartmentLocationSummary = (schema) => {
    if (!schema.data.departments) return null;
    
    const departmentsWithAddress = schema.data.departments.filter(
      dept => dept.address && dept.address.streetAddress
    );
    
    if (departmentsWithAddress.length === 0) return null;
    
    return `${departmentsWithAddress.length} department${departmentsWithAddress.length > 1 ? 's' : ''} with separate location${departmentsWithAddress.length > 1 ? 's' : ''}`;
  };

  if (savedSchemas.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Saved Schemas
            </h1>
            <p className="text-gray-600">
              Your saved dealership schemas will appear here
            </p>
          </div>

          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiPlus} className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No saved schemas yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first schema to get started
            </p>
            <Link
              to="/builder"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create New Schema
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Saved Schemas
            </h1>
            <p className="text-gray-600">
              Manage your saved dealership schemas
            </p>
          </div>
          <Link
            to="/builder"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <SafeIcon icon={FiPlus} className="text-sm" />
            <span>New Schema</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedSchemas.map((schema, index) => (
            <motion.div
              key={schema.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">
                    {schema.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {schema.data.address?.addressLocality && schema.data.address?.addressRegion
                      ? `${schema.data.address.addressLocality}, ${schema.data.address.addressRegion}`
                      : 'Location not specified'
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <button
                    onClick={() => copySchema(schema)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded"
                    title="Copy Schema"
                  >
                    <SafeIcon 
                      icon={copiedId === schema.id ? FiCheck : FiCopy} 
                      className="text-sm" 
                    />
                  </button>
                  <button
                    onClick={() => downloadSchema(schema)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded"
                    title="Download Schema"
                  >
                    <SafeIcon icon={FiDownload} className="text-sm" />
                  </button>
                  <button
                    onClick={() => deleteSchema(schema.id)}
                    className="text-gray-400 hover:text-red-600 p-1 rounded"
                    title="Delete Schema"
                  >
                    <SafeIcon icon={FiTrash2} className="text-sm" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> {schema.data.telephone || 'Not specified'}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Departments:</span> {
                    schema.data.departments?.length > 0
                      ? schema.data.departments.map(d => d.name).join(', ')
                      : 'None specified'
                  }
                </div>
                {getDepartmentLocationSummary(schema) && (
                  <div className="text-sm text-blue-600 flex items-center space-x-1">
                    <SafeIcon icon={FiMapPin} className="text-xs" />
                    <span>{getDepartmentLocationSummary(schema)}</span>
                  </div>
                )}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Updated:</span> {
                    format(new Date(schema.updatedAt), 'MMM d, yyyy')
                  }
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  to={`/builder?edit=${schema.id}`}
                  className="flex-1 bg-primary-50 hover:bg-primary-100 text-primary-700 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <SafeIcon icon={FiEdit} className="text-sm" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => duplicateSchema(schema)}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Duplicate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedSchemas;