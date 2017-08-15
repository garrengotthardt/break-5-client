const BASE_URL = process.env.REACT_APP_API

const headers = () => {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}


export const getPlaces = () => {
  return (fetch(`${BASE_URL}/places`, {
    method: 'GET',
    headers: headers(),
  }).then(res => res.json()))
}
