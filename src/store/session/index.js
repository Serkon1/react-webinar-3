import StoreModule from "../module";
import Profile from "../profile";

class SessionState extends StoreModule {
  initState() {
    return {
      isLoggedIn: false,
      userData: {
        name: ''
      },
      error: '',
      waiting: false
    }
  }

  async login(login, password) {
    try {
      this.setSession({waiting: true})
      const response = await fetch('/api/v1/users/sign?fields=_id%2Cemail%2Cprofile%28name%2Cphone%29', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login,
          password,
          remember: true
        })
      })

      const json = await response.json()

      if(`${response.status}`.slice(0, 1) === '2') {
        const user = json.result.user
        localStorage.setItem('token', json.result.token)
        this.setSession({isLoggedIn: true, userData: {name: user.profile.name}})
      }
      if(`${response.status}`.slice(0, 1) === '4'){
        this.setSession({error: json.error.data.issues[0].message})
      }
    } catch (e) {
      console.error(e)
    } finally {
      this.setSession({waiting: false})
    }
  }

  async initializationLogin() {
    this.setSession({waiting: true})

    const token = localStorage.getItem('token')
    if(token) {

      try {
        const response = await fetch('/api/v1/users/self?fields=_id%2Cemail%2Cprofile%28name%2Cphone%29', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': `${token}`
          }
        })
        const json = await response.json()

        if(`${response.status}`.slice(0, 1) === '2') {
          const user = json.result
          this.setSession({isLoggedIn: true, userData: {name: user.profile.name}})
        } else if(`${response.status}`.slice(0, 1) === '4') {
          localStorage.clear()
          this.setSession({
            ...this.initState()
          })
          console.error(`Ошибка авторизации: ${response.statusText}`)
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      localStorage.clear()
      this.setSession({
        ...this.initState()
      })
    }
    this.setSession({waiting: false})

  }

  async logout() {
    this.setSession({waiting: true})

    const token = localStorage.getItem('token')
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        }
      })

    } catch (e) {
      console.error(e)
    } finally {
      localStorage.clear()
      this.setSession({
        ...this.initState()
      })
    }
    this.setSession({waiting: false})

  }

  setSession(newSession = {}) {
    this.setState({
      ...this.getState(),
      ...newSession
    })
  }
}
export default SessionState;
