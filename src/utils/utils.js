export const makeClassName = (arr) => {
  let mainClass = ''
  
  if (Array.isArray(arr) && typeof arr[0] === 'string') {
    mainClass = arr[0]; 
  } else {
    return;
  }

  let className = mainClass;

  if (arr.length > 1) {
    for (let i = 1; i <= arr.length - 1; i++) {
      if (
        Array.isArray(arr[i])
        && arr[i][0]
        && typeof arr[i][1] === 'string'
      ) {
        className += ` ${/^_/.test(arr[i][1]) ? mainClass : ''}${arr[i][1]}`;
      }
    }
  }

  return className;
}

export const createArrayFromValues = (arr, key) => arr.map((i) => i[key]);

export const createDataAndKeyArray = (arr, dateKey, key) => arr.map((i) => {
  const date = (new Date(i[dateKey])).getTime();
  return [date, i[key]];
  // return array like [[date, value],]
});
