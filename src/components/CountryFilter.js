import React, { useState, useEffect } from "react";

function CountryFilter({ onChange }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch("http://localhost:5135/api/hondaWmi");
      const data = await response.json();
      const countrySet = new Set(data.map((d) => d.country));
      const countryArray = Array.from(countrySet).sort();
      setCountries(countryArray);
    }
    fetchCountries();
  }, []);

  const handleSelectChange = (e) => {
    onChange(e.target.value);
  };

  const filteredCountries = countries.filter(
    (country) => country && country.trim() !== ""
  );

  return (
    <div className="flex items-center my-4">
      <label className="mr-2 text-gray-600 font-bold">Country</label>
      <select
        onChange={handleSelectChange}
        className="px-2 py-1 border border-gray-400"
      >
        <option value="">All Countries</option>
        {filteredCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryFilter;
