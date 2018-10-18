import {User} from "../../models/user";
import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

  private _user:User = new User();
  private _status:Number = 0;

  constructor(private nativeStorage: Storage) {
    console.log('Hello UserProvider Provider');
    this.statusUsers().then(
      theStatus => this._status = theStatus
    )
  }

  get user():User {
    return this._user;
  }

  set user(value:User) {
    this._user = value;
  }

  statusUsers(){
    return this.nativeStorage.get('users')
    .then( // Trying to grab data stocker by key 'users'
      data => { // Succeessful test - plugin succeed to connect to local storage
        if( data === null){ // Test if data 'users' didn't exist
          this.nativeStorage.set('users', []); // Creation data 'users'
          return 0
        }else{ // Test if data 'users' exist
          if(Array.isArray(data)) // Test if it's an array
            return (data.length > 0)? 1 : -1;
          else{ // Test if it's an array
            this.nativeStorage.set('users', []);
            return 0;
          }
        }
      },
      error => { // Unsuccessful test - create data and retry test
        this.nativeStorage.set('users', []);
        return 0;
      }
    );
  }

  checkedEmail(email:string){
    this.nativeStorage.set('users', [{email:"jjj", password:"jjj"}]).then(
    return this.nativeStorage.get('users').then(
      users => {
        for(let i = 0; i < this.user.length; i++){ // loop on ele stock in key 'users'
          if(users[i].email === email) // Test if email already exist
          return true;
        }
        return false;
      }
    )
  }

  registerUser(user:User){
    switch(this._status){
      case 1: // Not null
        return this.nativeStorage.get('users').then(
          users => {
            let isValidated: boolean = false; // Init var - aim is to test if email is already in array, default: don't exist
            for(let i = 0; i < this.user.length; i++){
              if(users[i].email === user.email) // Test if email exist
               isValidated = true // Save val in var
            if(isValidated)
              return false;
            users.push(user) // Add new user in array
            return true;
          }
        )
      case 0:
      case -1:
      return this.nativeStorage.set('users', [user]).then(
        data => { return true; }
      )
      default:
      return this.nativeStorage.set('users', [user]).then(
        data => { return true; }
      )
    }
  }

  loginUser(email:string, password:string){
    /*this.nativeStorage.get('users').then(
      users => {
        for(let i = 0; i < this.user.length; i++){ // loop on ele stock in key 'users'
        if(users[i].email === email && users[i].password === password){
          return true;
        }
        return false; // Email or Password false
      }*/
    return this.checkedEmail(email).then( // Use then bc it's a promise || test if email is already registered
      data => {
        if(data){ // Result verif of Promise 'checkedEmail'
          return this.nativeStorage.get('users').then( // Recup users
          data => {
            console.log("-----------------")
            for(let i = 0; i < data.length; i++)
              if(users[i].email === email && users[i].password === password){ // Password verification
              this._user = users[i]; // Ajout 
                return true;
              }
            return false;
          })
        }
        return false
      }
    )
  }

  updateUser(user:User){
    return this
  }
}
