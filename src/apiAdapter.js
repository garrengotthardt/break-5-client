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

export const getPlace = (placeID) => {
  return (fetch(`${BASE_URL}/places/${placeID}`, {
    method: 'GET',
    headers: headers(),
  }).then(res => res.json()))
}

export const postNewItem = (selectedEstablishment) => {
  return(fetch(`${BASE_URL}/create_nested`, {
    method: 'POST',
    body: JSON.stringify(selectedEstablishment),
    headers: headers()
  }).then(res => res.json()))
}
