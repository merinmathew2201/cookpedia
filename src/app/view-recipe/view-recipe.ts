import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../services/api-services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-view-recipe',
  imports: [Header, Footer, RouterLink],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {

  allRelatedRecipes:any = signal([])
  recipe:any = signal({})
  route = inject(ActivatedRoute)
  recipeId:string = this.route.snapshot.params['id']
  api = inject(ApiServices)
  router = inject(Router)

  ngOnInit(){
    this.getViewRecipe(this.recipeId)
  }

  getViewRecipe(id:string){
    this.api.viewRecipeAPI(id).subscribe((res:any)=>{
      this.recipe.set(res)
      // console.log(this.recipe());
      // get related recipes
      this.getRelatedRecipe(res.cuisine)
    })
  }

  getRelatedRecipe(cuisine:string){
    this.api.getRelatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if(res.length>1){
        this.allRelatedRecipes.set(res.filter((item:any)=>item.name!=this.recipe().name))
        console.log(this.allRelatedRecipes());
      }else{
        this.allRelatedRecipes.set([])
      }
    })
  }

  viewRelatedRecipe(id:string){
    this.getViewRecipe(id)
    this.router.navigateByUrl(`recipes/${id}/view`)
  }



}
