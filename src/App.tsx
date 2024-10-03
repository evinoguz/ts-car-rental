import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CarType } from "./types";
import LoadMore from "./components/LoadMore";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Warning from "./components/Warning";
import Card from "./components/Card";
import fetchCars from "./utils/fetchCars";
import { fuels, years } from "./utils/constants";
import Loader from "./components/Loader";

const App = () => {
  const [params] = useSearchParams();
  const [cars, setCars] = useState<CarType[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(8);

  useEffect(() => {
    const paramsObj = Object.fromEntries(params.entries());

    fetchCars({ limit, ...paramsObj })
      .then((data) => setCars(data))
      .catch(() => setIsError(true));
  }, [limit, params]);
  return (
    <div className="min-h-screen text-white bg-[rgb(23,23,23)]">
      <Header />
      <Hero />
      <div className="mt-12 padding-x padding-y max-width">
        <div className="home__text-contaniner">
          <h1 className="text-4xl font-extrabold">Araba Kataloğu</h1>
          <p>Beğenebileceğin arabaları keşfet</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <Filter options={fuels} name="fuel_type" />
            <Filter options={years} name="year" />
          </div>
        </div>

        {!cars ? (
          <div className="my-5 ms-10">
            <Loader />
          </div>
        ) : isError ? (
          <Warning>Üzgünüz, bir hata oluştu.</Warning>
        ) : cars.length < 1 ? (
          <Warning>Aranılan kriterlere uygun araç bulunamadı.</Warning>
        ) : (
          cars.length > 1 && (
            <section>
              <div className="home__cars-wrapper">
                {cars.map((car, i) => (
                  <Card key={i} car={car} />
                ))}
              </div>
              <LoadMore
                limit={limit}
                handleClick={() => {
                  setLimit(limit + 8);
                }}
              />
            </section>
          )
        )}
      </div>
    </div>
  );
};

export default App;
