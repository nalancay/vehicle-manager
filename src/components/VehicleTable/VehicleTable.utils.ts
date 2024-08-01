export const buildApiUrl = (filters: any) => {
  const defaultModel = "camry";
  const baseUrl = "https://api.api-ninjas.com/v1/cars?";
  const params = new URLSearchParams();
  params.append("limit", "50");

  if (filters.make) params.append("make", filters.make);
  params.append("model", filters.model ? filters.model : defaultModel);
  if (filters.year) params.append("year", filters.year);
  if (filters.transmission) params.append("transmission", filters.transmission);
  if (filters.minConsumption)
    params.append("min_city_mpg", filters.minConsumption);
  if (filters.maxConsumption)
    params.append("max_city_mpg", filters.maxConsumption);

  return baseUrl + params.toString();
};
