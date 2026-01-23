import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../services/api-services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  imports: [],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {

  recipe:any = signal({})
  route = inject(ActivatedRoute)
  recipeId:string = this.route.snapshot.params['id']
  api = inject(ApiServices)

  ngOnInit(){
    this.getViewRecipe()
  }

  getViewRecipe(){
    this.api.viewRecipeAPI(this.recipeId).subscribe((res:any)=>{
      this.recipe.set(res)
      console.log(this.recipe());
      
    })
  }

}
