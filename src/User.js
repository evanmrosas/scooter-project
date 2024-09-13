class User {
  // User code here
  constructor(username, password, age){
    this.username = username
    this.password = password
    this.age = age
    this.loggedIn = false
  }
  // logges the user in and checks if the password is correct
  login(password){
    if(password == this.password){
      this.loggedIn = true;
    } else{
      throw new Error('incorrect password');
    }
  }
  // logges the user out
  logout(){
    this.loggedIn = false;
  }
}
module.exports = User
