import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import axios from 'axios';

export const MEAL_API = 'MEAL_API';

export const axiosMealProvider = {
  provide: MEAL_API,
  useFactory: (configService: ConfigService): AxiosInstance => {
    return axios.create({
      baseURL: configService.get<string>('MEAL_API_URL'),
      timeout: 1000,
    });
  },
  inject: [ConfigService],
};
