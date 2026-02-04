import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../../services/api-services';

@Component({
  selector: 'app-feedbacks',
  standalone: false,
  templateUrl: './feedbacks.html',
  styleUrl: './feedbacks.css',
})
export class Feedbacks {

  allFeedbacks:any = signal([])
  api = inject(ApiServices)


  ngOnInit(){
    this.getAllFeedbacks()
  }


  getAllFeedbacks(){
    this.api.getAllFeedbacksAPI().subscribe((res:any)=>{
      this.allFeedbacks.set(res)
      console.log(this.allFeedbacks());
    })
  }

  updateFeedback(id:string,status:string){
    this.api.updateFeedbackAPI(id,{status}).subscribe((res:any)=>{
      this.getAllFeedbacks()
    })
  }

}
