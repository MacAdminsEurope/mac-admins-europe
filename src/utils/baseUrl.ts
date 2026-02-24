export const getBaseUrl = () => {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl === "/" ? "" : baseUrl;
};
