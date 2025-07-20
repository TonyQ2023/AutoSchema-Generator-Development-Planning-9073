import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SchemaBuilder from './pages/SchemaBuilder';
import SavedSchemas from './pages/SavedSchemas';
import Resources from './pages/Resources';
import { SchemaProvider } from './context/SchemaContext';

function App() {
  return (
    <SchemaProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <motion.main 
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/builder" element={<SchemaBuilder />} />
              <Route path="/saved" element={<SavedSchemas />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </motion.main>
          <Footer />
        </div>
      </Router>
    </SchemaProvider>
  );
}

export default App;