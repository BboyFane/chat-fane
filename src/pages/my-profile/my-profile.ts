import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Util} from "../../providers/util/util";
import {User} from "../../models/user";
import {HttpProvider} from "../../providers/http/http";
import { UserProvider } from '../../providers/user/user';
import { ListFriendsPage } from '../list-friends/list-friends';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})

export class MyProfilePage {

  public Util = Util;
  public oldEmail:string;
  private profile: User = new User();
  private isLoading: boolean = true;
  /* Type of var:
  private string:string = "ddaz zad";
  private intfloatdouble:Number = "33.1";
  private boolean:boolean = true;
  private alltype:any = { toto: "toto" };
  private alltype:any = [{ toto: "toto" }];
  private instanceUser = 
  private array:Array<any/Number> = [22,15,a]
  */

  constructor(
    public http:HttpProvider,
    public navCtrl: NavController,
    public navParams: NavParams
    private userProvider:UserProvider) {
  }

  ionViewDidLoad() {
    this.isLoading = true;
    this.profile = this.userProvider.user;
    });
  }

  doSubmit() {
    if( this.oldEmail === this.profile.email ) {
      this.userProvider.updateUser(this.profile,).then(
        data => this.navCtrl.setRoot("ListFriendsPage")
      )
    }else{
      this.userProvider.updateUser(this.profile, { type: true, email: this.oldEmail }).then(
        data => this.navCtrl.setRoot("ListFriendsPage")
      )
    }
  }

}
