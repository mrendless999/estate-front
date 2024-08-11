import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PropertyList.css'; // Create a CSS file for styling

// Mapping property types to images
const propertyImages = {
  Villa: [
    'https://example.com/villa1.jpg',
    'https://example.com/villa2.jpg',
    'https://example.com/villa3.jpg',
  ],
  House: [
    'https://example.com/house1.jpg',
    'https://example.com/house2.jpg',
    'https://example.com/house3.jpg',
  ],
  Plot: [
    'https://example.com/plot1.jpg',
    'https://example.com/plot2.jpg',
    'https://example.com/plot3.jpg',
  ],
  Commercial: [
    'https://example.com/commercial1.jpg',
    'https://example.com/commercial2.jpg',
    'https://example.com/commercial3.jpg',
  ],
  Rental: [
    'https://example.com/rental1.jpg',
    'https://example.com/rental2.jpg',
    'https://example.com/rental3.jpg',
  ],
};

const getRandomImage = (type) => {
  const images = propertyImages[type] || [];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex] || 'https://example.com/default.jpg'; // Default image if none available
};

const PropertyList = () => {
  const { type } = useParams();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/properties/propertyType/${type}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;
        console.log("Fetched properties:", data); // Debugging
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [type]);

  return (
    <div className="property-list">
      <h2>{type ? type.toUpperCase() : 'Properties'}</h2>
      {properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <img
                src={getRandomImage(property.propertyType)}
                alt={`${property.propertyType} image`}
                className="property-image"
              />
              <strong>Location:</strong> {property.location}<br/>
              <strong>Size:</strong> {property.size}<br/>
              <strong>Price:</strong> {property.price}<br/>
              <strong>For Sale:</strong> {property.sale ? 'Yes' : 'No'}<br/>
              <strong>For Rent:</strong> {property.rent ? 'Yes' : 'No'}<br/>
              <strong>Details:</strong> {property.details}<br/>
              <strong>Agent Name:</strong> {property.agentName}<br/>
              <strong>Agent Contact:</strong> {property.agentContact}<br/>
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found for this type.</p>
      )}
    </div>
  );
};

export default PropertyList;
