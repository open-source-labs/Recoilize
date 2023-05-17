// this function doesn't seem to work properly. moved to separate file to clean up snapshot container file (5.2023)

// create a function to store current data to local storage

const toLocalStorage = (data: any) => {
  for (let i = 0; i < data.length; i++) {
    const jsonData = JSON.stringify(data[i]);
    localStorage.setItem(`${i}`, jsonData);
  };
};

export default toLocalStorage;