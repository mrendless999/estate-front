import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import "./SellerDashboard.css";

// Sample data for insights
const propertyTypes = [
  { name: "Villas", count: 4, color: "#ff8c00" },
  { name: "Houses", count: 8, color: "#e07c00" },
  { name: "Plots", count: 12, color: "#d2691e" },
  { name: "Commercial Buildings", count: 3, color: "#cd853f" },
  { name: "PG/Rentals", count: 6, color: "#deb887" },
];

const propertyPrices = [
  { name: "Villas", price: 1200000 },
  { name: "Houses", price: 900000 },
  { name: "Plots", price: 500000 },
  { name: "Commercial Buildings", price: 2000000 },
  { name: "PG/Rentals", price: 300000 },
];

const Sidebar = ({ activeTab, setActiveTab }) => (
  <div className="seller-sidebar">
    <ul className="seller-sidebar-menu">
      <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</li>
      <li className={activeTab === "properties" ? "active" : ""} onClick={() => setActiveTab("properties")}>My Properties</li>
      <li className={activeTab === "insights" ? "active" : ""} onClick={() => setActiveTab("insights")}>Insights</li>
      <li className={activeTab === "messages" ? "active" : ""} onClick={() => setActiveTab("messages")}>Messages</li>
    </ul>
  </div>
);

const PropertyList = ({ properties, selectedPropertyIndex, handlePreviousProperty, handleNextProperty }) => {
  const selectedProperty = properties[selectedPropertyIndex];

  if (!selectedProperty) return <p>No properties available.</p>;

  return (
    <div className="seller-property-list">
      <h2>Your Property</h2>
      <div>
        <strong>Location:</strong> {selectedProperty.location} <br />
        <strong>BHK:</strong> {selectedProperty.bhk} <br />
        <strong>Size:</strong> {selectedProperty.size} sqft <br />
        <strong>Price:</strong> {selectedProperty.price} <br />
        <strong>Agent:</strong> {selectedProperty.agentName}, {selectedProperty.agentPhone} <br />
        <strong>Details:</strong> {selectedProperty.details} <br />
      </div>
      <div className="property-navigation">
        <button onClick={handlePreviousProperty} disabled={properties.length <= 1}>Previous</button>
        <button onClick={handleNextProperty} disabled={properties.length <= 1}>Next</button>
      </div>
    </div>
  );
};

const Insights = () => (
  <div className="seller-insights">
    <h2>Property Insights</h2>
    <div className="seller-charts">
      {/* Pie Chart for Property Distribution */}
      <div className="chart-container">
        <h3>Property Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={propertyTypes}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#ff8c00"
              paddingAngle={5}
              dataKey="count"
            >
              {propertyTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Bar Chart for Property Prices */}
      <div className="chart-container">
        <h3>Average Property Prices</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={propertyPrices}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#ff8c00" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Line Chart for Sales Trends */}
      <div className="chart-container">
        <h3>Sales Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={propertyPrices}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#ff8c00"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

function SellerDashboard({ sellerName }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [properties, setProperties] = useState([]);
  const [selectedPropertyIndex, setSelectedPropertyIndex] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/properties");
        const limitedProperties = response.data.slice(0, 3);
        setProperties(limitedProperties);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };

    fetchProperties();
  }, []);

  const handleNextProperty = () => {
    setSelectedPropertyIndex((prevIndex) => (prevIndex + 1) % properties.length);
  };

  const handlePreviousProperty = () => {
    setSelectedPropertyIndex((prevIndex) => (prevIndex - 1 + properties.length) % properties.length);
  };

  return (
    <div className="seller-container">
      <div className="seller-dashboard">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="seller-content">
          {activeTab === "dashboard" && (
            <div className="seller-dashboard-content">
              <h1 className="seller-welcome">Welcome Back, {sellerName}</h1>
              <p className="seller-intro">
                Manage your real estate properties effectively and track your sales performance.
              </p>
              <div className="seller-insights-overview">
                {propertyTypes.map((property, index) => (
                  <div
                    key={index}
                    className="seller-insight-card"
                    style={{ borderColor: property.color }}
                  >
                    <h3>{property.name}</h3>
                    <p>{property.count} properties listed</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "insights" && <Insights />}
          {activeTab === "properties" && (
            <PropertyList
              properties={properties}
              selectedPropertyIndex={selectedPropertyIndex}
              handleNextProperty={handleNextProperty}
              handlePreviousProperty={handlePreviousProperty}
            />
          )}
          {activeTab === "messages" && (
            <div className="seller-messages">
              <h2>Messages</h2>
              <p>Coming Soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
