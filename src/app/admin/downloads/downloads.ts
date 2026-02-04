import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../../services/api-services';

@Component({
  selector: 'app-downloads',
  standalone: false,
  templateUrl: './downloads.html',
  styleUrl: './downloads.css',
})
export class Downloads {
  
  downloadList:any = signal([])
  api = inject(ApiServices)

  ngOnInit(){
    this.getDownloads()
  }

  getDownloads(){
    this.api.getAllDownloadRecipeAPI().subscribe((res:any)=>{
      this.downloadList.set(res)
      console.log(this.downloadList());
    })
  }
}
