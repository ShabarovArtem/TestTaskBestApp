import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

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

      return response.data.meals;
    } catch (error) {
      throw new BadRequestException(
        'Failed to fetch meal data from external API',
      );
    }
  }
}
