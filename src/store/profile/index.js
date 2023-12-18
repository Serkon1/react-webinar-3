import StoreModule from "../module";

class Profile extends StoreModule {
  initState() {
    return {
      _id: '',
      name: '',
      phone: '',
      email: '',
      waiting: false
    }
  }

  setProfileData(user) {
    this.setProfile({
      _id: user._id,
      name: user.profile.name,
      phone: user.profile.phone,
      email: user.email,
    })
  }

   async loadProfile() {
     this.setProfile({waiting: true})

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
           this.setProfileData(user)
         } else if(`${response.status}`.slice(0, 1) === '4') {
           localStorage.clear()
           this.cleanProfile()
         }
       } catch (e) {
         console.error(e)
       }
     } else {
       localStorage.clear()
       this.cleanProfile()
     }
     this.setProfile({waiting: false})
   }
   cleanProfile() {
    this.setProfile({
      ...this.initState()
    })
   }
   setProfile(newProfile = {}) {
    this.setState({
      ...this.getState(),
      ...newProfile
    }, 'Установка пользователя')
  }
}

export default Profile;
