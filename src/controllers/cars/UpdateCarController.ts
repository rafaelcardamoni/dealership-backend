import { Request, Response } from 'express';
import { UpdateCarService } from '../../services/cars/UpdateCarService';

class UpdateCarController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
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

    const updateCarService = new UpdateCarService();

    const result = await updateCarService.execute({
      id,
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

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}

export { UpdateCarController };
