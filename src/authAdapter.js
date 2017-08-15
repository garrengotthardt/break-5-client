const baseUrl = 'http://localhost:3000/api/v1'

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static signup (signupParams) {
   return fetch(`${baseUrl}/signup`, {
     method: 'POST',
     headers: headers(),
     body: JSON.stringify(signupParams)
   }).then(res => res.json())
 }

  static currentUser () {
    return fetch(`${baseUrl}/me`, {
      headers: headers()
    }).then(res => res.json())
  }

  static updateCurrentUser (authState) {
    return fetch(`${baseUrl}/users/${authState.user.id}`, {
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
