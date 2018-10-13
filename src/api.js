export const getWeatherForLocation = city => {
  const [lat, long] = city["latt_long"].split(",");
  return fetch(
    `/forecast/${lat},${long}`,
    {
      mode: "cors"
    }
  ).then(res => res.json());
};
