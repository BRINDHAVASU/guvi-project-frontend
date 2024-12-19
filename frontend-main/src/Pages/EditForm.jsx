import React, { useState, useEffect } from "react";
import "./EditContactForm.css"; // Create a corresponding CSS file for styling

const EditForm = ({ contactData, onClose, onSave }) => {
  const [formData, setFormData] = useState(contactData);
  const [countryChange, setCountryChange] = useState("");
  const [countries, setCountries] = useState([]);
  const [Countrycode, setCountryCode] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    alert("Updated Successfully");
    // onClose();
  };

  useEffect(() => {
    fetch("https://countrynamewithphonecode.onrender.com/")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const handleCountrycodechange = (e) => {
    const valueSelected = e.target.value;
    setCountryChange(valueSelected);
    const countryData = countries.find(
      (country) => country.name === valueSelected
    );

    if (countryData) {
      setCountryCode(countryData.code);
      // Update the formData with the selected country code
      setFormData({ ...formData, code: countryData.code });
    } else {
      setCountryCode("");
    }
  };

  return (
    <div className="edit-form-container">
      <div className="edit-form">
        <h2>Edit Contact</h2>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <label htmlFor="code">Country Code:</label>
        <select onChange={handleCountrycodechange} value={countryChange}>
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option value={country.name} key={country._id}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="countrycode"
          value={formData.code}
          readOnly
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <div className="button-container">
          <button className="save-button" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
