import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SchemaForm from '../components/SchemaForm';
import SchemaPreview from '../components/SchemaPreview';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useSchema } from '../context/SchemaContext';

const { FiEye, FiCode, FiSave, FiCheck } = FiIcons;

const SchemaBuilder = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [schemaData, setSchemaData] = useState({});
  const [editingSchema, setEditingSchema] = useState(null);
  const [schemaSaved, setSchemaSaved] = useState(false);
  const [schemaName, setSchemaName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { saveSchema, updateSchema, getSchema } = useSchema();

  useEffect(() => {
    // Check if we're editing an existing schema
    const params = new URLSearchParams(location.search);
    const editId = params.get('edit');
    
    if (editId) {
      const schema = getSchema(editId);
      if (schema) {
        setEditingSchema(schema);
        setSchemaData(schema.data);
        setSchemaName(schema.name);
      }
    }
  }, [location, getSchema]);

  const handleSave = () => {
    if (!schemaName.trim()) {
      setSchemaName(schemaData.name || 'Untitled Schema');
    }
    
    try {
      if (editingSchema) {
        updateSchema(editingSchema.id, schemaData, schemaName);
      } else {
        saveSchema(schemaData, schemaName);
      }
      
      setSchemaSaved(true);
      setTimeout(() => {
        setSchemaSaved(false);
      }, 3000);
      
      setShowSaveDialog(false);
    } catch (error) {
      console.error('Error saving schema:', error);
    }
  };

  const tabs = [
    { id: 'form', label: 'Builder', icon: FiCode },
    { id: 'preview', label: 'Preview', icon: FiEye },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {editingSchema ? 'Edit Schema' : 'Schema Builder'}
          </h1>
          <p className="text-gray-600">
            Create professional Schema.org markup for your car dealership
          </p>
        </div>

        {/* Tabs for mobile */}
        <div className="lg:hidden mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-4 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <SafeIcon icon={tab.icon} className="text-sm" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${activeTab === 'form' ? 'block' : 'hidden'} lg:block`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Dealership Information
                </h2>
                <button
                  onClick={() => setShowSaveDialog(true)}
                  className="text-primary-600 hover:text-primary-700 flex items-center space-x-2 text-sm"
                >
                  <SafeIcon icon={schemaSaved ? FiCheck : FiSave} className="text-sm" />
                  <span>{schemaSaved ? 'Saved!' : 'Save Schema'}</span>
                </button>
              </div>
              <SchemaForm 
                onDataChange={setSchemaData} 
                initialData={editingSchema?.data}
              />
            </div>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${activeTab === 'preview' ? 'block' : 'hidden'} lg:block`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Schema Preview
              </h2>
              <SchemaPreview data={schemaData} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Schema</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Schema Name
              </label>
              <input
                type="text"
                value={schemaName}
                onChange={(e) => setSchemaName(e.target.value)}
                placeholder={schemaData.name || 'Untitled Schema'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemaBuilder;