import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ApiServices } from '../services/api-services';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [Header, Footer, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  api = inject(ApiServices)
  imgURL:any = signal("https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png")
  username:string = ""
  userId:string = ""
  downloadList:any = signal([])

  ngOnInit(){
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user") || "")
      this.username = user.username
      this.userId = user._id
      user.picture && this.imgURL.set(`${this.api.server_url}/uploads/${user.picture}`)
      this.getDownloadList()
    }
  }

  uploadPicture(event:Event){
    const input = event.target as HTMLInputElement
    if(input.files && input.files.length>0){
      const uploadFile = input.files[0]
      const reqBody = new FormData()
      reqBody.append("picture",uploadFile)
      this.api.updateUserProfileAPI(this.userId,reqBody).subscribe((res:any)=>{
        alert("User Profile updated successfully!!!")
        sessionStorage.setItem("user",JSON.stringify(res))
        this.imgURL.set(`${this.api.server_url}/uploads/${res.picture}`)
      })
    }
  }

  getDownloadList(){
    this.api.getUserDownloadRecipeAPI().subscribe((res:any)=>{
      this.downloadList.set(res)
      console.log(this.downloadList());
      
    })
  }
}
