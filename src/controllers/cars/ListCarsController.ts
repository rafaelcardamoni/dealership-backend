import { Request, Response } from 'express';
import { ListCarService } from '../../services/cars/ListCarsService';

class ListCarsController {
  async handle(request: Request, response: Response) {
    const listCarsService = new ListCarService();

    const cars = await listCarsService.execute();

    return response.json(cars);
  }
}

export { ListCarsController };
