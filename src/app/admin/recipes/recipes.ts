import { Component, inject, signal } from '@angular/core';
import { ApiServices } from '../../services/api-services';

@Component({
  selector: 'app-recipes',
  standalone: false,
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  api = inject(ApiServices)
  allRecipe:any = signal([])
  searchKey:string = ""

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res)=>{
      this.allRecipe.set(res)
    })
  }
}
