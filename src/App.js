import './App.css';
import React from 'react';
import { useRef, useState } from 'react';

const Api_key = "1a1de8602e308c01160350d53c0aad7f";

function App() {
  const inputRef = useRef(null);

  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/606/606795.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3072/3072063.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/2465/2465979.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/3222/3222791.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/727/727789.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/128/7398/7398108.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/9233/9233695.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3406/3406977.png",
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          // ARRAY OF OBJ
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/3585/3585596.png",
            },
          ]);
        }
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };


  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="bg-white w-3/4 md:w-1/2 p-4 rounded-md">
        <div className="flex items-center justify-between flex-col ">
          <div className="justify-between">
            <input
              onKeyDown={(event) => event.key === 'Enter' && fetchWeather()}
              type="text"
              ref={inputRef}
              placeholder="Enter Your Location"
              className="text-xl border-2 p-1 border-gray-200 font-semibold uppercase flex-1"
            />
            <button onClick={fetchWeather} className="flex-1 ml-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                alt="..."
                className="w-8 p-1"
              />
            </button>
          </div>
          <div className={`
                        mt-4
                        duration-300
                        delay-75
                        overflow-hidden${showWeather ? "h-[27rem]" : "h-0"}`}>
            {loading ? (
              <div className="grid place-items-center h-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/189/189768.png"
                  alt="..."
                  className="w-14 mx-auto mb-2 animate-spin"
                />
              </div>
            ) : (
              showWeather && (
                <div className="text-center flex flex-col gap-6 mt-10">
                  {apiData && (
                    <p className="text-xl font-semibold">
                      {apiData?.name + "," + apiData?.sys?.country}
                    </p>
                  )}
                  <img
                    src={showWeather[0]?.img}
                    alt="..."
                    className="w-52 mx-auto"
                  />
                  <h3 className="text-2xl font-bold text-zinc-800">
                    {showWeather[0]?.type}
                  </h3>

                  {apiData && (
                    <>
                      <div className="flex justify-center">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                          alt="..."
                          className="h-9 mt-1"
                        />
                        <h2 className="text-4xl font-extrabold">
                          {apiData?.main?.temp}&#176;C
                        </h2>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
