import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../../services/api-services';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  userList:any = signal([])
  api = inject(ApiServices)

  ngOnInit(){
    this.getAllUsers()
  }


  getAllUsers(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.userList.set(res)
      console.log(this.userList());
    })
  }

}
