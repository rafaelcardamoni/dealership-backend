import { Request, Response } from 'express';
import { CreateCarService } from '../../services/cars/CreateCarService';

class CreateCarController {
  async handle(request: Request, response: Response) {
    const {
      make,
      model,
      trim,
      year,
      mileage,
      price,
      engine,
      transmission,
      power,
      fuel,
      city_consumption,
      road_consumption,
      range,
      type,
      color
    } = request.body;

    const createCarService = new CreateCarService();

    const car = await createCarService.execute({
      make,
      model,
      trim,
      year,
      mileage,
      price,
      engine,
      transmission,
      power,
      fuel,
      city_consumption,
      road_consumption,
      range,
      type,
      color
    });

    return response.json(car);
  }
}

export { CreateCarController };
