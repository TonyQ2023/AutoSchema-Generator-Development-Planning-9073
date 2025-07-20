export const generateSchema = (data) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer"
  };

  // Basic information
  if (data.name) schema.name = data.name;
  if (data.description) schema.description = data.description;
  if (data.url) schema.url = data.url;
  if (data.logo) schema.logo = data.logo;
  if (data.telephone) schema.telephone = data.telephone;
  if (data.email) schema.email = data.email;

  // Address
  if (data.address && (data.address.streetAddress || data.address.addressLocality)) {
    schema.address = {
      "@type": "PostalAddress"
    };
    
    if (data.address.streetAddress) schema.address.streetAddress = data.address.streetAddress;
    if (data.address.addressLocality) schema.address.addressLocality = data.address.addressLocality;
    if (data.address.addressRegion) schema.address.addressRegion = data.address.addressRegion;
    if (data.address.postalCode) schema.address.postalCode = data.address.postalCode;
    if (data.address.addressCountry) schema.address.addressCountry = data.address.addressCountry;
  }

  // Geo coordinates
  if (data.geo && (data.geo.latitude || data.geo.longitude)) {
    schema.geo = {
      "@type": "GeoCoordinates"
    };
    
    if (data.geo.latitude) schema.geo.latitude = parseFloat(data.geo.latitude);
    if (data.geo.longitude) schema.geo.longitude = parseFloat(data.geo.longitude);
  }

  // Opening hours
  if (data.openingHours && data.openingHours.length > 0) {
    schema.openingHoursSpecification = data.openingHours
      .filter(hours => hours.dayOfWeek && hours.opens && hours.closes)
      .map(hours => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.dayOfWeek,
        opens: hours.opens,
        closes: hours.closes
      }));
  }

  // Departments
  if (data.departments && data.departments.length > 0) {
    const validDepartments = data.departments.filter(dept => dept.name);
    if (validDepartments.length > 0) {
      schema.department = validDepartments.map(dept => {
        const department = {
          "@type": "AutomotiveBusiness",
          name: dept.name
        };
        
        if (dept.telephone) department.telephone = dept.telephone;
        if (dept.email) department.email = dept.email;
        
        // Add department address if provided
        if (dept.address && (dept.address.streetAddress || dept.address.addressLocality)) {
          department.address = {
            "@type": "PostalAddress"
          };
          
          if (dept.address.streetAddress) department.address.streetAddress = dept.address.streetAddress;
          if (dept.address.addressLocality) department.address.addressLocality = dept.address.addressLocality;
          if (dept.address.addressRegion) department.address.addressRegion = dept.address.addressRegion;
          if (dept.address.postalCode) department.address.postalCode = dept.address.postalCode;
          if (dept.address.addressCountry) department.address.addressCountry = dept.address.addressCountry;
        }
        
        return department;
      });
    }
  }

  // Payment methods
  if (data.paymentAccepted && data.paymentAccepted.length > 0) {
    schema.paymentAccepted = data.paymentAccepted;
  }

  // Social profiles
  if (data.socialProfiles && data.socialProfiles.length > 0) {
    const validProfiles = data.socialProfiles.filter(profile => profile && profile.trim());
    if (validProfiles.length > 0) {
      schema.sameAs = validProfiles;
    }
  }

  // Area served
  if (data.areaServed && data.areaServed.length > 0) {
    const validAreas = data.areaServed.filter(area => area && area.trim());
    if (validAreas.length > 0) {
      schema.areaServed = validAreas.map(area => ({
        "@type": "Place",
        name: area
      }));
    }
  }

  // Add additional automotive-specific properties
  schema.currenciesAccepted = "USD";
  
  // Offer catalog for automotive services
  schema.hasOfferCatalog = {
    "@type": "OfferCatalog",
    name: "Automotive Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vehicle Sales"
        }
      },
      {
        "@type": "Offer", 
        itemOffered: {
          "@type": "Service",
          name: "Vehicle Service & Repair"
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service", 
          name: "Parts & Accessories"
        }
      }
    ]
  };

  return schema;
};

export const validateSchema = (schema) => {
  const errors = [];
  const warnings = [];

  // Required fields
  if (!schema.name) errors.push('Business name is required');
  if (!schema.url) errors.push('Website URL is required');
  if (!schema.telephone) errors.push('Phone number is required');
  if (!schema.address) errors.push('Address information is required');
  
  if (schema.address) {
    if (!schema.address.streetAddress) errors.push('Street address is required');
    if (!schema.address.addressLocality) errors.push('City is required');
    if (!schema.address.addressRegion) errors.push('State/Region is required');
    if (!schema.address.postalCode) errors.push('Postal code is required');
  }

  // Recommended fields
  if (!schema.description) warnings.push('Business description is recommended');
  if (!schema.logo) warnings.push('Logo URL is recommended');
  if (!schema.openingHoursSpecification) warnings.push('Opening hours are recommended');
  if (!schema.geo) warnings.push('Geographic coordinates are recommended for better local SEO');

  return { errors, warnings, isValid: errors.length === 0 };
};