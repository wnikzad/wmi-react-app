import React, { useState, useEffect } from "react";
import "./App.css";
import Filter from "./components/Filter";
import CountryFilter from "./components/CountryFilter";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5135/api/hondaWmi") // Fetch data from backend api
      .then((response) => response.json())
      .then((data) => {
        setData(
          data.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
        );
        setFilteredData(data);
      });
  }, []);

  const keys = ["name", "wmi", "country", "createdOn", "vehicleType"]; // keys to render table data

  const getRowsJsx = () => {
    if (filteredData.length === 0) {
      return (
        <>
          <tr>
            <td
              className="px-4 py-2 border text-[#ff0000] font-bold border-gray-200"
              colSpan={keys.length}
            >
              Nothing matches your query.
            </td>
          </tr>
        </>
      );
    } else {
      return filteredData.map((d) => {
        const id = d.id + d.wmi; // since the api data does not have a unique value. I concatenated id with wmi to create a unique id as required by React.
        return (
          <tr
            className="bg-[#f7f7f7] even:bg-bg-[#f7f7f7] odd:bg-[#ffffff]"
            key={id}
          >
            {keys.map((k) => {
              return (
                <td
                  className="px-4 py-1 border border-gray-200"
                  key={`${id}-${k}`}
                >
                  {d[k]}
                </td>
              );
            })}
          </tr>
        );
      });
    }
  };

  const handleFilterChange = (value) => {
    // This handles both the Filter input as well as the Select Country
    if (value === "") {
      setFilteredData(data);
    } else if (value.startsWith("country:")) {
      const selectedCountry = value.substring(8);
      const filtered = data.filter((d) => d.country === selectedCountry);
      setCountryFilter(selectedCountry);
      setFilteredData(filtered);
    } else {
      const filtered = data.filter(
        (d) =>
          (d.name && d.name.toLowerCase().includes(value.toLowerCase())) ||
          (d.wmi && d.wmi.toLowerCase().includes(value.toLowerCase())) ||
          (d.country &&
            d.country.toLowerCase().includes(value.toLowerCase())) ||
          (d.wmi && d.wmi.toLowerCase().includes(value.toLowerCase())) ||
          (d.vehicleType &&
            d.vehicleType.toLowerCase().includes(value.toLowerCase()))
      );
      setCountryFilter("");
      setFilteredData(filtered);
    }
  };

  return (
    <div className="App p-[10px] sm:p-0 sm:max-w-[1140px] m-auto">
      <div className="mx-auto my-[1em] text-3xl text-center font-semibold">
        WMI Data - Honda | Total: {filteredData.length}
      </div>
      <div className="flex flex-row gap-x-4">
        <div>
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <div>
          <CountryFilter
            onChange={(value) => handleFilterChange(`country:${value}`)}
            selectedCountry={countryFilter}
          />
        </div>
      </div>

      <table className="table-auto border border-collapse border-gray-200">
        <thead>
          <tr>
            {keys.map((k) => {
              if (k === "name") {
                // For proper capitalization and word spacing the below condition is added to replace fetched values
                k = "Name";
              } else if (k === "wmi") {
                k = "WMI";
              } else if (k === "country") {
                k = "Country";
              } else if (k === "createdOn") {
                k = "Created On";
              } else if (k === "vehicleType") {
                k = "Vehicle Type";
              }
              return (
                <th
                  className="px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300"
                  key={k}
                >
                  {k}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>{getRowsJsx()}</tbody>
      </table>
    </div>
  );
}

export default App;
