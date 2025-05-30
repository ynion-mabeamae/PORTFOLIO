async function searchCountry() {
  const countryName = document.getElementById("input_country").value.trim();
  if (!countryName) {
    alert("Please enter a country name");
    return;
  }

  showLoading();

  try {
    const country = await fetchCountryByName(countryName);
    displayCountryInfo(country);

    const regionCountries = await fetchCountriesByRegion(country.region);
    displayRegionCountries(regionCountries);
  } catch (error) {
    showError(error.message);
    console.error("Error:", error);
  }
}

function showLoading() {
  const countryDetails = document.getElementById("country_details");
  const regionDiv = document.getElementById("region");

  countryDetails.innerHTML = `
                    <div class="loading">Loading country information...</div>`;
  regionDiv.innerHTML = `<div class="loading">Loading regional data...</div>`;
}

async function fetchCountryByName(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  if (!response.ok) throw new Error("Country not found");
  const data = await response.json();
  return data[0];
}

async function fetchCountriesByRegion(region) {
  const response = await fetch(
    `https://restcountries.com/v3.1/region/${region}`
  );
  if (!response.ok) throw new Error("Could not fetch region data");
  return await response.json();
}

function displayCountryInfo(country) {
  const countryDetails = document.getElementById("country_details");

  const info = {
    name: country.name.common,
    capital: country.capital?.[0] || "N/A",
    population: country.population?.toLocaleString(),
    area: country.area?.toLocaleString(),
    languages: country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A",
    currencies: country.currencies
      ? Object.values(country.currencies)
          .map((c) => c.name)
          .join(", ")
      : "N/A",
    flag: country.flags?.png,
  };

  countryDetails.innerHTML = `
    <div class="country-card main-country">
      <h2>${info.name}</h2>
      ${
        info.flag ? `<img src="${info.flag}" 
                  alt="Flag of ${info.name}" />` : ""
      }
      <p><strong>Capital:</strong> ${info.capital}</p>
      <p><strong>Population:</strong> ${info.population}</p>
      <p><strong>Area:</strong> ${info.area} km²</p>
      <p><strong>Languages:</strong> ${info.languages}</p>
      <p><strong>Currencies:</strong> ${info.currencies}</p>
    </div>`;
}

function displayRegionCountries(countries) {
  const regionDiv = document.getElementById("region");

  const cards = countries
    .map(
      (country) => `
      <div class="country-card">
        <h3>${country.name.common}</h3>
        ${
          country.flags?.png
            ? `<img src="${country.flags.png}" 
                  alt="Flag of ${country.name.common}" />`
            : ""
        }
        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
        <p><strong>Population:</strong>
          ${country.population?.toLocaleString()}</p>
      </div>`
    )
    .join("");

  regionDiv.innerHTML = `
    <h3 class="region-title">Countries in the Same Region</h3>
    <div class="countries-grid">${cards}</div>`;
}

function showError(message) {
  const errorHTML = `<div class="error">${message}</div>`;
  document.getElementById("country_details").innerHTML = errorHTML;
  document.getElementById("region").innerHTML = errorHTML;
}