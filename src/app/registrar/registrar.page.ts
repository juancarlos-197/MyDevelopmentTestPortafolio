import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.mdel';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: false,

})
export class RegistrarPage implements OnInit {
  user = {} as User
  constructor(
    private toasCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAutf: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }
  async registro(user: User) {
    if (!this.formValidation()) {
      console.log('data', user)
      let loader = await this.loadingCtrl.create({
        message: "Espere por favor... "
      })
      await loader.present()
      try {
        await this.afAutf.createUserWithEmailAndPassword(user.email, user.password).then(data => {
            console.log('"Espere por favor... "', data)
            this.navCtrl.navigateRoot("home")
          }
        )
      } catch (e: any) {
        e.message = "Error al registrarse";
        let errorMessage = e.message || e.getLocalizedMessage();
        this.showToast(errorMessage)
      }
      await loader.dismiss()
    }
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast("Ingresar un email");
      return false
    }
    if (!this.user.password) {
      this.showToast("Ingresar un password");
      return false
    }
    return false
  }
  showToast(message: string) {
    this.toasCtrl.create({
      message: message,
      duration: 4000
    }).then(toasData => toasData.present());
  }
}
