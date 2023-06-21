import { useState, useEffect } from "react";
import styled from "styled-components";
import { Navigation } from "./components/Navigation/Navigation";

// Styled-Components

const Container = styled.div`
  text-align: center;
`;

const Loader = styled.div`
  font-size: 24px;
  margin-top: 20px;
`;

const CountryCard = styled.div`
  display: inline-block;
  width: 12rem;
  max-height: 290px;
  margin: 10px;
  padding: 10px;
  border: 1px solid hsl(0, 0%, 98%);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
`;

const Flag = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const CountryName = styled.h3`
  margin: 0;
  font-weight: 800;
`;

const CountryInfo = styled.p`
  margin: 0;
`;

const Title = styled.span`
  font-weight: 600;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 5rem;

  select {
    width: 15rem;
    height: 2rem;
  }

  input {
    width: 15rem;
    height: 2rem;
  }
`;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // Input
  const SearchInput = styled.input`
    margin-bottom: 10px;
  `;

  // Select
  const SelectFilter = styled.select`
    margin-bottom: 10px;
  `;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRegionFilter = (event) => {
    setSelectedRegion(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v2/all?fields=name,capital,flag,population,region"
        );
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loader
  if (loading) {
    return <Loader>Loading...</Loader>;
  }

  return (
    <Container>
      <Navigation />
      <TopBar>
        <SearchInput
          type="text"
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleSearch}
        />

        <SelectFilter value={selectedRegion} onChange={handleRegionFilter}>
          <option value="">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </SelectFilter>
      </TopBar>

      {filteredCountries.map((country) => (
        <CountryCard key={country.name}>
          <Flag src={country.flag} alt={country.name} />
          <CountryName>{country.name}</CountryName>
          <CountryInfo>
            <Title>Capital:</Title> {country.capital}
          </CountryInfo>
          <CountryInfo>
            <Title>Population:</Title> {country.population}
          </CountryInfo>
          <CountryInfo>
            <Title>Region:</Title> {country.region}
          </CountryInfo>
        </CountryCard>
      ))}
    </Container>
  );
};

export default App;
