import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Post } from './../models/post.model';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.page.html',
  styleUrls: ['./edit-page.page.scss'],
  standalone: true,
  imports: [IonicModule,FormsModule],
})
export class EditPagePage implements OnInit {

  post = {} as Post
id:any
  constructor(
        private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private angularFistore: AngularFirestore,
    private router: Router,
    private toasCtrl: ToastController,

    private afAutf: AngularFireAuth,
    private navCtrl: NavController,

  ) { 
    this.id= this.actRoute.snapshot.paramMap.get("id")
  }

  ngOnInit() {
    this.getPostById(this.id)
  }
  async getPostById(id: string) {

   
    let loader = await this.loadingCtrl.create({
      message: "Espere un pomento por favor... "
    })
    await loader.present()
   

      this.angularFistore
      .doc('posts/'+id)
        .valueChanges()
        .subscribe((data: any) => {
        const {title,details}=data as {title:string, details:string};
        this.post.title=data.title;
        this.post.details =data.datails;
         loader.dismiss();

        })

      await loader.dismiss();
    
      


  }




 async updatePost(post: Post) {


      let loader = await this.loadingCtrl.create({
        message: "Actualmente ... "
      })
      await loader.present()
        this.angularFistore
        .doc('posts/'+this.id)
        .update(post)
        .then(()=>{
          this.router.navigate(['/home'])
                   loader.dismiss();

        })
      .catch ((errar)=>{
        loader.dismiss
      }) 
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
    return true
  }
  showToast(message: string) {
    this.toasCtrl.create({
      message: message,
      duration: 4000
    }).then(toasData => toasData.present());
  }
}