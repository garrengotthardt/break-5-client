const BASE_URL = process.env.REACT_APP_API

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static signup (signupParams) {
   return fetch(`${BASE_URL}/signup`, {
     method: 'POST',
     headers: headers(),
     body: JSON.stringify(signupParams)
   }).then(res => res.json())
 }

  static currentUser () {
    return fetch(`${BASE_URL}/me`, {
      headers: headers()
    }).then(res => res.json())
  }

  static updateCurrentUser (authState) {
    return fetch(`${BASE_URL}/users/${authState.user.id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(authState)
    }).then(res => res.json())
  }


}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
