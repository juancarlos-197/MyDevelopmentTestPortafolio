import { Component } from '@angular/core';
import { User } from '../models/user.mdel'
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts: any
  constructor(
    private toasCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private angularFistore: AngularFirestore,

  ) { }
  ionViewWillEnter() {
    this.getPosts()
  }


  async getPosts() {
    let loader = await this.loadingCtrl.create({
      message: "Espere un pomento por favor... "
    })
    await loader.present()
    try {

      this.angularFistore.collection('posts')
        .snapshotChanges()
        .subscribe((data: any[]) => {
          this.posts = data.map((e: any) => {
            return {
              id: e.payload.doc.id,
              title: e.payload.doc.data()["title"],
              details: e.payload.doc.data()["details"]

            }
          })
        })

      await loader.dismiss();
    } catch (e: any) {
      e.message = "Mensaje de error del home ";
      let errorMessage = e.message || e.getLocalizedMessage();
      this.showToast(errorMessage)
    }
    await loader.dismiss()

  }

  async deletePost(id:string) {
    let loader = await this.loadingCtrl.create({
      message: "Espere un pomento por favor... "
    })
    await loader.present()
  await this.angularFistore.doc("posts/"+id).delete()
    await loader.dismiss()

  }


  showToast(message: string) {
    this.toasCtrl.create({
      message: message,
      duration: 4000
    }).then(toasData => toasData.present());
  }
}



