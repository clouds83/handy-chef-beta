import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterRecipesPipe implements PipeTransform {
  transform(recipes: any[], searchText: string): any[] {
    if (!recipes) return [];
    if (!searchText) return recipes;
    searchText = searchText.toLowerCase();
    return recipes.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
  }
}
