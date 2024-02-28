import React, {  useState } from "react";
import searchImg from '../assets/search.png'
import humidityImg from '../assets/humidity.png'
import winfImg from '../assets/wind.png'
export default function Weather() {
    const [location, setLocation] = useState('');
    const [response, setResponse] = useState({});
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const setCity = async () => {
        const fetchData = await fetch(`https://api.weatherapi.com/v1/current.json?key=4e8b756c5e114a0b8db31728242502&q=${location}`);
        const data = await fetchData.json();
        console.log(data)
        if (fetchData.status === 400) {
            setError(true);
            setResponse({});
        } else {
            setError(false);
            setResponse(data);
        }
    };

    return (
        <div className="card">
            <div className="search">
                <input value={location} onChange={handleChange} type="text" placeholder="Enter City Name" spellCheck="false" />
                <button onClick={setCity}><img src={searchImg} alt="search icon" /></button>
            </div>

            {error && (
                <div className="error">
                    <p>* Invalid city name !</p>
                </div>
            )}

            {!error && response.current && (
                <div className="weather">
                    <img src={response.current.condition.icon} className="weather-icon" alt="weather icon" />
                    <h3 className="textsample">{response.current.condition.text}</h3>
                    <h1 className="temp">{`${response.current.temp_c}°C`}</h1>
                    <h2 className="city">{response.location.name}</h2>
                    <h2 className="country">{response.location.country}</h2>
                    

                    <div className="details">
                        <div className="col">
                            <img src={humidityImg} alt="humidity icon" />
                            <div>
                                <p className="humidity">{`${response.current.humidity}%`}</p>
                                <p className="line"> Humidity</p>
                            </div>
                        </div>

                        <div className="col">
                            <img src={winfImg} alt="wind icon" />
                            <div>
                                <p className="wind">{`${response.current.wind_kph}kmh`}</p>
                                <p className="line">Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
