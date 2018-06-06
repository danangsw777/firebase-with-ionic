import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  Alert, AlertController,
  Loading, LoadingController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  public resetPasswordForm: FormGroup;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder){
      
          // perintah untuk validasi form
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required])
      ]
    });
    }

    resetPassword() {
      // cek email dan password sudah valid atau belum
      if (!this.resetPasswordForm.valid) { // belum valid
        console.log(`Form belum valid: ${this.resetPasswordForm.value}`);
      } else {    // sudah valid
        // baca formControlName dahulu
        const email = this.resetPasswordForm.value.email;
        
        // cek firebase dari AuthProvider
        this.authProvider.resetPassword(email)
          .then(    // resolve
            user => {
              const myAlert: Alert = this.alertCtrl.create({
                  message: 'check email untuk reset password!!',
                  buttons: [{ text: 'Yes', role: 'cancel',
                  handler:()=>{
                    this.navCtrl.pop()
                  }
                }]

                });
                myAlert.present();
            },      // reject
            error => {
              
                const errorAlert: Alert = this.alertCtrl.create({
                  message: error.message,
                  buttons: [{ 
                    text: 'Yes', 
                    role: 'cancel',
                   
                }]
                });
                errorAlert.present();
              }
            )
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
