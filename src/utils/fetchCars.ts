import { CarType } from "../types";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "ad6bb313ddmsh062704acbce640fp18e651jsnd2e76e1075ed",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  },
};
type Params = {
  limit: number;
  make?: string;
  model?: string;
  fuel_type?: string;
  year?: string;
};
const fetchCars = async ({
  limit,
  make = "bmw",
  model = "m4",
  fuel_type = "",
  year = "",
}: Params): Promise<CarType[]> => {
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&limit=${limit}&fuel_type=${fuel_type}&year=${year}`;
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
};

export default fetchCars;
