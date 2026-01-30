import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiServices } from '../services/api-services';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-contact',
  imports: [FormsModule,Header,Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  api=inject(ApiServices)
  name:string = ""
  email:string = ""
  message:string = ""

  submitFeedback(){
    if(this.name && this.email && this.message){
      this.api.addFeedbackAPI({name:this.name,email:this.email,message:this.message}).subscribe((res:any)=>{
        alert("Thankyou for your Feedback!! We appreciate your effort to improve us!!!")
        this.name=""
        this.email=""
        this.message=""
      })
    }else{
      alert("Fill the Form Completely!!!")
    }
  }
}
