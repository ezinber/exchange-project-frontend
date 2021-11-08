export const createArrayFromValues = (arr, key) => arr.map((i) => i[key]);

export const createDataAndKeyArray = (arr, dateKey, key) => arr.map((i) => {
  const date = (new Date(i[dateKey])).getTime();
  return [date, i[key]];
  // return array like [[date, value],]
});
