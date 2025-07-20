import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { placeholderData } from '../utils/placeholderData';

const { FiInfo, FiPlus, FiTrash2, FiDatabase } = FiIcons;

const SchemaForm = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    url: '',
    logo: '',
    telephone: '',
    email: '',
    address: {
      streetAddress: '',
      addressLocality: '',
      addressRegion: '',
      postalCode: '',
      addressCountry: 'US'
    },
    geo: {
      latitude: '',
      longitude: ''
    },
    openingHours: [
      {
        dayOfWeek: 'Monday',
        opens: '09:00',
        closes: '18:00'
      }
    ],
    departments: [
      {
        name: 'Sales',
        telephone: '',
        email: '',
        address: {
          streetAddress: '',
          addressLocality: '',
          addressRegion: '',
          postalCode: '',
          addressCountry: 'US'
        }
      }
    ],
    paymentAccepted: [],
    socialProfiles: [''],
    areaServed: ['']
  });

  const [activeSection, setActiveSection] = useState('basic');

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const updateFormData = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (path, defaultItem = '') => {
    setFormData(prev => ({
      ...prev,
      [path]: [...prev[path], defaultItem]
    }));
  };

  const removeArrayItem = (path, index) => {
    setFormData(prev => ({
      ...prev,
      [path]: prev[path].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (path, index, value) => {
    setFormData(prev => ({
      ...prev,
      [path]: prev[path].map((item, i) => i === index ? value : item)
    }));
  };

  const updateDepartmentAddress = (index, field, value) => {
    setFormData(prev => {
      const updatedDepartments = [...prev.departments];
      if (!updatedDepartments[index].address) {
        updatedDepartments[index].address = {
          streetAddress: '',
          addressLocality: '',
          addressRegion: '',
          postalCode: '',
          addressCountry: 'US'
        };
      }
      updatedDepartments[index].address[field] = value;
      return { ...prev, departments: updatedDepartments };
    });
  };

  const loadPlaceholderData = () => {
    setFormData(placeholderData);
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: FiInfo },
    { id: 'location', label: 'Location', icon: FiInfo },
    { id: 'hours', label: 'Hours', icon: FiInfo },
    { id: 'departments', label: 'Departments', icon: FiInfo },
    { id: 'additional', label: 'Additional', icon: FiInfo }
  ];

  const paymentOptions = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'Check',
    'Bank Transfer',
    'Financing Available'
  ];

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dealership Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="ABC Auto Dealership"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Describe your dealership's services and specialties..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Website URL *
        </label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => updateFormData('url', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="https://www.yourdealership.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Logo URL
        </label>
        <input
          type="url"
          value={formData.logo}
          onChange={(e) => updateFormData('logo', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="https://www.yourdealership.com/logo.png"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.telephone}
            onChange={(e) => updateFormData('telephone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="+1-555-123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="info@yourdealership.com"
          />
        </div>
      </div>
    </div>
  );

  const renderLocation = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Street Address *
        </label>
        <input
          type="text"
          value={formData.address.streetAddress}
          onChange={(e) => updateFormData('address.streetAddress', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="123 Main Street"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.address.addressLocality}
            onChange={(e) => updateFormData('address.addressLocality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Your City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            value={formData.address.addressRegion}
            onChange={(e) => updateFormData('address.addressRegion', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="State"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={formData.address.postalCode}
            onChange={(e) => updateFormData('address.postalCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="12345"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={formData.address.addressCountry}
            onChange={(e) => updateFormData('address.addressCountry', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude
          </label>
          <input
            type="number"
            step="any"
            value={formData.geo.latitude}
            onChange={(e) => updateFormData('geo.latitude', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="40.7128"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude
          </label>
          <input
            type="number"
            step="any"
            value={formData.geo.longitude}
            onChange={(e) => updateFormData('geo.longitude', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="-74.0060"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Areas Served
        </label>
        {formData.areaServed.map((area, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={area}
              onChange={(e) => updateArrayItem('areaServed', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="City or Region"
            />
            {formData.areaServed.length > 1 && (
              <button
                onClick={() => removeArrayItem('areaServed', index)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <SafeIcon icon={FiTrash2} className="text-sm" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayItem('areaServed', '')}
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm"
        >
          <SafeIcon icon={FiPlus} className="text-sm" />
          <span>Add Area</span>
        </button>
      </div>
    </div>
  );

  const renderHours = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Opening Hours
        </label>
        {formData.openingHours.map((hours, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-md">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Day
              </label>
              <select
                value={hours.dayOfWeek}
                onChange={(e) => updateArrayItem('openingHours', index, { ...hours, dayOfWeek: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Opens
              </label>
              <input
                type="time"
                value={hours.opens}
                onChange={(e) => updateArrayItem('openingHours', index, { ...hours, opens: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Closes
              </label>
              <input
                type="time"
                value={hours.closes}
                onChange={(e) => updateArrayItem('openingHours', index, { ...hours, closes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-end">
              {formData.openingHours.length > 1 && (
                <button
                  onClick={() => removeArrayItem('openingHours', index)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <SafeIcon icon={FiTrash2} className="text-sm" />
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => addArrayItem('openingHours', { dayOfWeek: 'Monday', opens: '09:00', closes: '18:00' })}
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm"
        >
          <SafeIcon icon={FiPlus} className="text-sm" />
          <span>Add Hours</span>
        </button>
      </div>
    </div>
  );

  const renderDepartments = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Departments
        </label>
        {formData.departments.map((dept, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-md mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Department Name
                </label>
                <input
                  type="text"
                  value={dept.name}
                  onChange={(e) => updateArrayItem('departments', index, { ...dept, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  placeholder="Sales, Service, Parts"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={dept.telephone}
                  onChange={(e) => updateArrayItem('departments', index, { ...dept, telephone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  placeholder="+1-555-123-4567"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={dept.email}
                  onChange={(e) => updateArrayItem('departments', index, { ...dept, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  placeholder="dept@dealership.com"
                />
              </div>
            </div>

            {/* Department Address Fields */}
            <div className="mt-4 mb-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Department Address</h4>
                <span className="text-xs text-gray-500">(Optional - if different from main address)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={dept.address?.streetAddress || ''}
                    onChange={(e) => updateDepartmentAddress(index, 'streetAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={dept.address?.addressLocality || ''}
                    onChange={(e) => updateDepartmentAddress(index, 'addressLocality', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="Your City"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={dept.address?.addressRegion || ''}
                    onChange={(e) => updateDepartmentAddress(index, 'addressRegion', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={dept.address?.postalCode || ''}
                    onChange={(e) => updateDepartmentAddress(index, 'postalCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="12345"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Country
                  </label>
                  <select
                    value={dept.address?.addressCountry || 'US'}
                    onChange={(e) => updateDepartmentAddress(index, 'addressCountry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              {formData.departments.length > 1 && (
                <button
                  onClick={() => removeArrayItem('departments', index)}
                  className="text-red-600 hover:text-red-700 p-2 flex items-center space-x-1"
                >
                  <SafeIcon icon={FiTrash2} className="text-sm" />
                  <span className="text-sm">Remove Department</span>
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => addArrayItem('departments', {
            name: '',
            telephone: '',
            email: '',
            address: {
              streetAddress: '',
              addressLocality: '',
              addressRegion: '',
              postalCode: '',
              addressCountry: 'US'
            }
          })}
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm"
        >
          <SafeIcon icon={FiPlus} className="text-sm" />
          <span>Add Department</span>
        </button>
      </div>
    </div>
  );

  const renderAdditional = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Payment Methods Accepted
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {paymentOptions.map(option => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.paymentAccepted.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({
                      ...prev,
                      paymentAccepted: [...prev.paymentAccepted, option]
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      paymentAccepted: prev.paymentAccepted.filter(p => p !== option)
                    }));
                  }
                }}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Social Media Profiles
        </label>
        {formData.socialProfiles.map((profile, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="url"
              value={profile}
              onChange={(e) => updateArrayItem('socialProfiles', index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="https://www.facebook.com/yourdealership"
            />
            {formData.socialProfiles.length > 1 && (
              <button
                onClick={() => removeArrayItem('socialProfiles', index)}
                className="text-red-600 hover:text-red-700 p-2"
              >
                <SafeIcon icon={FiTrash2} className="text-sm" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayItem('socialProfiles', '')}
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm"
        >
          <SafeIcon icon={FiPlus} className="text-sm" />
          <span>Add Social Profile</span>
        </button>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'basic': return renderBasicInfo();
      case 'location': return renderLocation();
      case 'hours': return renderHours();
      case 'departments': return renderDepartments();
      case 'additional': return renderAdditional();
      default: return renderBasicInfo();
    }
  };

  return (
    <div>
      {/* Test Data Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={loadPlaceholderData}
          className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm"
        >
          <SafeIcon icon={FiDatabase} className="text-sm" />
          <span>Load Test Data</span>
        </button>
      </div>
      
      {/* Section Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeSection === section.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Form Content */}
      <div className="max-h-96 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default SchemaForm;