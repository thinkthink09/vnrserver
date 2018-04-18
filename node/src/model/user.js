export default class User {
  constructor(name, username, email){
     this.name = name;
     this.username = username;
     this.email = email;
   }

   getUsername(){
     return this.username;
   }
   getName(){
     return this.name;
   }
}
