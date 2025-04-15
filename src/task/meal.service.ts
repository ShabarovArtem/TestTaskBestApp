import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';

export interface MealBasic {
  idMeal: string;
  strMeal: string;
  strCategory: string;
}

@Injectable()
export class MealService {
  async getMeal(idMeal: string) {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/lookup.php',
        {
          params: {
            i: idMeal,
          },
        },
      );

      const meal = response.data.meals?.[0];

      if (!meal) {
        throw new NotFoundException('Meal with id not found');
      }

      if (!meal.idMeal || !meal.strMeal || !meal.strCategory) {
        throw new NotFoundException('Meal data is incomplete');
      }

      return {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory,
      } as MealBasic;
    } catch (error) {
      throw new BadRequestException(
        'Failed to fetch meal data from external API',
      );
    }
  }
}
