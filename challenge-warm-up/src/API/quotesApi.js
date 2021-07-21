const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'; 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
  const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));
  
  async function callApi(endpoint, options = {}) {
    await simulateNetworkLatency();
    
    options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Referer': 'http://localhost:3000',
  };
  
  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  
  return data;
}

const loginApi = {
  quotes: {
    getQ() {
        return callApi(`/`);
      },
    getIdQ(id) {
        return callApi(`/${id}`)
    },
    postQ(values) {
        return callApi(`/`, {
          method: 'POST',
          body: JSON.stringify(values),
        });
      },
    updateQ(id, update) {
        return callApi(`/${id}`, {
          method: 'PUT',
          body: JSON.stringify(update),
        });
      },
      removeQ(id) {
        return callApi(`/${id}`, {
          method: 'DELETE',
        });
      },
  },
};

export default loginApi;