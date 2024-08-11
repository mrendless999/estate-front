import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PropertyDetailsPage.css';

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

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const amenities = [
    "Swimming pool",
    "Gym",
    "24/7 Security",
    "Parking",
    "Garden",
    "Playground",
    "Clubhouse"
  ];

  const getRandomImage = (type) => {
    const images = propertyImages[type] || [];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex] || 'https://example.com/default.jpg'; // Default image if none available
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8080/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        setError('Error fetching property details');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!property) {
    return <p>No property found.</p>;
  }

  return (
    <div className="property-details-page">
      {/* Display an image based on property type */}
      <img
        src={getRandomImage(property.propertyType)}
        alt={`${property.propertyType} in ${property.location}`}
        className="property-image"
      />
      <div className="property-details-container">
        <h2>{property.propertyType} in {property.location}</h2>
        <div className="property-bhk"><strong>BHK:</strong> {property.bhk}</div>
        <div className="property-size"><strong>Size:</strong> {property.size}</div>
        <div className="property-price"><strong>Price:</strong> {property.sale ? `Buy at ${property.price}` : `Rent at ${property.price}`}</div>
        <div className="property-agent">
          <strong>Agent:</strong> {property.agentName}, {property.agentContact}
        </div>
        <div className="property-details"><strong>Details:</strong> {property.details}</div>
        <div className="property-features">
          <h3>Features:</h3>
          <ul>
            {property.features && property.features.length > 0 ? (
              property.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))
            ) : (
              <li>No features listed</li>
            )}
          </ul>
        </div>
        <div className="property-amenities">
          <h3>Amenities:</h3>
          <ul>
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
