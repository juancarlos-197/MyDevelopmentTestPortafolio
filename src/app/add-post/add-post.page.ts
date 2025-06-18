import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Post } from './../models/post.model';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddPostPage implements OnInit {
  post = {} as Post

  constructor(
    private toasCtrl: ToastController,
    private afAutf: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private angularFistore: AngularFirestore,

  ) { }

  ngOnInit() {
  }
  async createPost(post: Post) {

    if (!this.formValidation()) {

      let loader = await this.loadingCtrl.create({
        message: "Espere un pomento por favor... "
      })
      await loader.present()
      try {
        this.angularFistore.collection('posts').add(post)
        await loader.dismiss();
      } catch (e: any) {
        e.message = "Mensaje de error de post  ";
        let errorMessage = e.message || e.getLocalizedMessage();
        this.showToast(errorMessage)
      }
      await loader.dismiss()
      this.navCtrl.navigateRoot("home")
    }
  }



  formValidation() {
    if (!this.post.title) {
      this.showToast("Ingresar un título");
      return false
    }
    if (!this.post.details) {
      this.showToast("Ingresar una descripción");
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

