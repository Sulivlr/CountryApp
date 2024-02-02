import React, {useCallback, useEffect, useState} from 'react';

const CountryInfo: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);

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
        <div>

        </div>
    );
};

export default CountryInfo;