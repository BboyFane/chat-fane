import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {HttpProvider} from "../../providers/http/http";
import {User} from "../../models/user";
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  // Auto completion of the form
  public account:User = {
    username: 'fane',
    fullname: 'Bboy Fane',
    email: 'fanetest@gmail.com',
    password: 'demodemo'
  };

  private loginErrorString: string; // Error message during connection
  private opt: string = 'signin'; // Option sign in (inscription) or sign up (connexion)

  constructor(
    public http:HttpProvider,
    public userProvider: UserProvider,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public translateService: TranslateService) { // Traduction multi language
      this.menuCtrl.enable(false); // No menu shown
    }

  // Attempt to login in through our User service
  doLogin() { // Meth when click on connection
    // Asynchrone request
    this.http.get('my-profile.json').subscribe((profile:User) => {
      this.userProvider.user = < User > profile;
      this.navCtrl.setRoot('ListFriendsPage');
      else{
        this.account.email = 'fanetest@gmail.com';
        this.account.password = 'demodemo';
        this.translateService.get('LOGIN_ERROR').subscribe((value) => { // translateService permet d'effectuer du multi-langue.
        // subscribe -> concept des PROMISE - OBSERVABLE, le traitement ce fait de manier asynch.
          this.loginErrorString = value; // Affichage du message d'erreur dans la page html via la variable "loginErrorString"
        })
      } // navCtrl => allow to navigate between page
    }, (err) => {
      console.error(err); // Error to grab user
    });
    console.log("Fane");
  }
  
  doLogin() {
    this.userProvider.loginUser(this.account.email, this.account.password).then(
      isConnect => {
        if(isConnect)
          this.navCtrl.setRoot('ListFriendPage'); // setRoot => permet de supprimer toutes les vues de la stack et de naviguer vers la root page.
        else
          this.loginErrorString = "Connection error";
      }
    )
  }

  checkedUser(users:User){
    /*
    if( users.email === this.account.email && users.password === this.account.password )
      return true;
    else
      return false;
    */

   return ( users.email === this.account.email && users.password === this.account.password ) ? true : false
  }
}
