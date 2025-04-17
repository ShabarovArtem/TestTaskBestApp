import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { MEAL_API } from '../http/http.provider';
import { AxiosInstance } from 'axios';

export interface MealBasic {
  idMeal: string;
  strMeal: string;
  strCategory: string;
}

interface ApiResponse {
  meals: MealBasic[];
}

@Injectable()
export class MealService {
  constructor(@Inject(MEAL_API) private readonly axios: AxiosInstance) {}
  async getMeal(idMeal: string) {
    try {
      const response = await this.axios.get<ApiResponse>('lookup.php', {
        params: { i: idMeal },
      });

      const meal = response.data.meals?.[0];

      if (!meal) {
        throw new NotFoundException('Meal with id not found');
      }

      return meal;
    } catch (error) {
      throw new BadRequestException(
        'Failed to fetch meal data from external API',
      );
    }
  }
}
