import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sampleSavedSchemas } from '../utils/placeholderData';

const SchemaContext = createContext();

export const useSchema = () => {
  const context = useContext(SchemaContext);
  if (!context) {
    throw new Error('useSchema must be used within a SchemaProvider');
  }
  return context;
};

export const SchemaProvider = ({ children }) => {
  const [savedSchemas, setSavedSchemas] = useState([]);
  const [currentSchema, setCurrentSchema] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    loadSavedSchemas();
  }, []);

  const loadSavedSchemas = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('autoschema_saved') || '[]');
      
      // If there are no saved schemas, load the sample data
      if (saved.length === 0 && !initialized) {
        setSavedSchemas(sampleSavedSchemas);
        localStorage.setItem('autoschema_saved', JSON.stringify(sampleSavedSchemas));
        setInitialized(true);
      } else {
        setSavedSchemas(saved);
        setInitialized(true);
      }
    } catch (error) {
      console.error('Error loading saved schemas:', error);
      setSavedSchemas([]);
    }
  };

  const saveSchema = (data, name) => {
    try {
      const schema = {
        id: uuidv4(),
        name: name || data.name || 'Untitled Schema',
        data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updated = [schema, ...savedSchemas];
      setSavedSchemas(updated);
      localStorage.setItem('autoschema_saved', JSON.stringify(updated));
      return schema;
    } catch (error) {
      console.error('Error saving schema:', error);
      throw error;
    }
  };

  const updateSchema = (id, data, name) => {
    try {
      const updated = savedSchemas.map(schema => 
        schema.id === id 
          ? {
              ...schema,
              data,
              name: name || data.name || schema.name,
              updatedAt: new Date().toISOString()
            } 
          : schema
      );
      
      setSavedSchemas(updated);
      localStorage.setItem('autoschema_saved', JSON.stringify(updated));
      return updated.find(s => s.id === id);
    } catch (error) {
      console.error('Error updating schema:', error);
      throw error;
    }
  };

  const deleteSchema = (id) => {
    try {
      const updated = savedSchemas.filter(schema => schema.id !== id);
      setSavedSchemas(updated);
      localStorage.setItem('autoschema_saved', JSON.stringify(updated));
    } catch (error) {
      console.error('Error deleting schema:', error);
      throw error;
    }
  };

  const getSchema = (id) => {
    return savedSchemas.find(schema => schema.id === id);
  };

  const duplicateSchema = (id) => {
    try {
      const original = getSchema(id);
      if (!original) throw new Error('Schema not found');
      
      const duplicate = {
        ...original,
        id: uuidv4(),
        name: `${original.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updated = [duplicate, ...savedSchemas];
      setSavedSchemas(updated);
      localStorage.setItem('autoschema_saved', JSON.stringify(updated));
      return duplicate;
    } catch (error) {
      console.error('Error duplicating schema:', error);
      throw error;
    }
  };

  const value = {
    savedSchemas,
    currentSchema,
    setCurrentSchema,
    saveSchema,
    updateSchema,
    deleteSchema,
    getSchema,
    duplicateSchema,
    loadSavedSchemas
  };

  return (
    <SchemaContext.Provider value={value}>
      {children}
    </SchemaContext.Provider>
  );
};