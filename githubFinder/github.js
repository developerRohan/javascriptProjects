class Github{
  constructor(){
    this.client_id ='7bcc760804b2b5d261ea';
    this.secret_id='d3873a75f5f6de0978d160d1880ed59eff0a07bd';
  }

  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();

    return{
      profile
    }
  }
}