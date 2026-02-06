import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from '../../services/api-services';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  api= inject(ApiServices)
  router = inject(Router)
  sideBarOpen:boolean = true
  userCount = signal<number>(0)
  recipeCount = signal<number>(0)
  downloadCount = signal<number>(0)
  feedbackCount = signal<number>(0)
  selected = new Date()
  barChartOptions : ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title:{
        display:true,
        text:'Analysis of Download Recipe Based on its Cuisine'
      }
    }
  };
  barChartData :ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Count',
        data: [12, 19, 8, 15, 22],
        backgroundColor: '#4CAF50'
      }
    ]
  };

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getFeedbackCount()
  }

  getUserCount(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.userCount.set(res.length)
    })
  }

  getRecipeCount(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.recipeCount.set(res.length)
    })
  }

  getDownloadCount(){
    this.api.getAllDownloadRecipeAPI().subscribe((res:any)=>{
      this.downloadCount.set(res.reduce((acc:any,cur:any)=>acc+cur.count,0))
    })
  }

  getFeedbackCount(){
    this.api.getAllFeedbacksAPI().subscribe((res:any)=>{
      this.feedbackCount.set(res.filter((item:any)=>item.status=="pending").length)
    })
  }

  toggleSidebar(){
    this.sideBarOpen = !this.sideBarOpen
  }

  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
