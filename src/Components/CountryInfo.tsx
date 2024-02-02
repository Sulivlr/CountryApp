import React, {useCallback, useEffect, useState} from 'react';

const CountryInfo: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);

    const POST_URL = 'https://restcountries.com/v2/alpha/';
    const COUNTRY_URL = 'https://restcountries.com/v2/all?fields=alpha3Code,name';

    const fetchCountries = useCallback(async () => {
        try {
            const response = await fetch(COUNTRY_URL);
            if (response.ok) {
                const data: Country[] = await response.json();
                setCountries(data);
            } else {
                throw new Error(`error list`);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchCountryInfo = useCallback(async (countryCode: string) => {
        try {
            const response = await fetch(`${POST_URL}/${countryCode}`);
            if (response.ok) {
                const data: CountryInfo = await response.json();
                setCountryInfo(data);
            } else {
                throw new Error(`Error info`);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    const CountryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const countryCode = event.target.value;
        setSelectedCountry(countryCode);

        if (countryCode) {
            fetchCountryInfo(countryCode);
        } else {
            setCountryInfo(null);
        }
    }, [fetchCountryInfo]);

    return (
        <>
            <h2>Select a country</h2>
            <select onChange={CountryChange} value={selectedCountry || ''}>
                <option value="">Select a country</option>
                {countries.map(country => (
                    <option key={country.alpha3Code} value={country.alpha3Code}>{country.name}</option>
                ))}
            </select>

            <div id="countryInfo">
                {selectedCountry ? (
                    <div>
                        <h3>{countryInfo?.name}</h3>
                        <p>This Country has borders with: {countryInfo?.borders?.join(', ')}</p>
                    </div>) : (
                    <p>Select a country for showing info</p>
                )}
            </div>
        </>
    );
};

export default CountryInfo;