import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  server_url = "http://localhost:3000"
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


  
}
