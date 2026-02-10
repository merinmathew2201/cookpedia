import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipeModel } from '../admin/models/recipeModel';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  server_url = "https://cookpedia-server-zeem.onrender.com"
  http = inject(HttpClient)

  //get all recipes - home, recipes
  getAllRecipesAPI(){
    return this.http.get(`${this.server_url}/recipes/all`)
  }

  //register - called by register when register btn clicked
  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  //login - called by login when login btn clicked
  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  // authorised user

  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  //view recipe - called by login when login btn clicked
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}`,this.appendToken())
  }

  // get related recipes by view component
  getRelatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/recipe-related?cuisine=${cuisine}`,this.appendToken())
  }

  // download recipe
  downloadRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/downloads/${recipeId}`,reqBody,this.appendToken())
  }

  // save-recipe by view when clicked on save recipe clicked
  saveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/save-recipe/${recipeId}`,reqBody,this.appendToken())
  }

  // save-recipe by view when clicked on save recipe clicked
  getUserSavedRecipeAPI(){
    return this.http.get(`${this.server_url}/save-recipes`,this.appendToken())
  }  

  //remove save-recipe by save recipe when clicked on delete  clicked
  removeUserSavedRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/save-recipes/${id}`,this.appendToken())
  } 

  // /feedback by contact page
  addFeedbackAPI(reqBody:any){
    return this.http.post(`${this.server_url}/feedback`,reqBody)
  } 

  // /approve-feedbacks:get request by home component when page loads
  getApproveFeedbackAPI(){
    return this.http.get(`${this.server_url}/approve-feedbacks`)
  }

  // /user/:id : put req by profile component when picture uploaded
  updateUserProfileAPI(id:string,reqBody:any){
    return this.http.put(`${this.server_url}/user/${id}`,reqBody,this.appendToken())
  } 

  // /user-downloads:get request when profile page loads
  getUserDownloadRecipeAPI(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  } 

  // /downloads:get request when admin download page loads
  getAllDownloadRecipeAPI(){
    return this.http.get(`${this.server_url}/downloads`,this.appendToken())
  } 

  // /users:get request when admin users list page loads
  getAllUsersAPI(){
    return this.http.get(`${this.server_url}/users`,this.appendToken())
  } 

  // /all-feedbacks:get request when admin users list page loads
  getAllFeedbacksAPI(){
    return this.http.get(`${this.server_url}/all-feedbacks`,this.appendToken())
  } 

  // /feedbacks/:id:get request when admin users list page loads
  updateFeedbackAPI(id:string,reqBody:any){
    return this.http.put(`${this.server_url}/feedbacks/${id}`,reqBody,this.appendToken())
  } 

  // /recipes:post request when admin add recicoe page loads
  addRecipeAPI(reqBody:RecipeModel){
    return this.http.post(`${this.server_url}/recipes`,reqBody,this.appendToken())
  } 

  // /recipes:put request when admin edit recicoe page loads
  updateRecipeAPI(recipeId:string,reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipes/${recipeId}`,reqBody,this.appendToken())
  } 

  // /recipes:delete request when admin  recicpe page loads
  removeRecipeAPI(recipeId:string){
    return this.http.delete(`${this.server_url}/recipes/${recipeId}`,this.appendToken())
  } 

  getChartData(){
    this.getAllDownloadRecipeAPI().subscribe((downloadListArray:any)=>{
      let output:any = {}
      downloadListArray.forEach((recipe:any)=>{
        let cuisine = recipe.cuisine
        let curCount = recipe.count
        if(cuisine in output){
          output[cuisine] +=curCount
        }else{
          output[cuisine] = curCount
        }
      })
      const keys = Object.keys(output)
      localStorage.setItem("labels",JSON.stringify(keys))
      const data = Object.values(output)
      localStorage.setItem("data", JSON.stringify(data))
    })
  }
}
