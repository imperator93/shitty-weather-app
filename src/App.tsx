import { useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState<T>();
  const [errors, setErrors] = useState<T>();

  const handleInput = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    fetch(`https://open-weather13.p.rapidapi.com/city/${event.target[0].value}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b51f66e2ddmsh4a0edc467058df5p1a5a7djsn8f5d47224f53",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "200") setWeather({ data });
        else {
          setErrors(data);
        }
      });
  };
  console.log(errors);
  console.log(weather);
  return (
    <>
      <form onSubmit={(event) => handleInput(event)}>
        <label>Enter city name:</label>
        <input required></input>
        <button type="submit">Find City</button>
      </form>

      {(weather && (
        <div>
          <div>City of {weather.data?.name} has this weather:</div>
          <ul style={{ listStyle: "none" }}>
            <li>Has {weather.data?.weather[0].description}</li>
            <li>
              Wind is {weather.data?.wind.deg} degrees and the speed is {weather.data?.wind.speed}{" "}
              km/h
            </li>
            <br />
            <li>Humidity is {weather.data.main.humidity}</li>
            <li>Pressure is {weather.data.main.pressure}</li>
            <li>Temperature is {weather.data.main.temp}</li>
            <li>Max temp is {weather.data.main.temp_max}</li>
            <li>Min temp is {weather.data.main.temp_min}</li>
          </ul>
        </div>
      )) || <div>{errors?.message}</div>}
    </>
  );
}

export default App;
