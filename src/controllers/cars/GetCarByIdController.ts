import { Request, Response } from 'express';
import { GetCarByIdService } from '../../services/cars/GetCarByIdService';

class GetCarByIdController {
  async handle(request: Request, response: Response) {
    const getCarByIdService = new GetCarByIdService();
    const { id } = request.params;

    if (!id) {
      return response.status(401).json('Invalid ID');
    }

    const car = await getCarByIdService.execute({ id });

    if (car instanceof Error) {
      return response.json(car.message);
    }

    return response.json(car);
  }
}

export { GetCarByIdController };
