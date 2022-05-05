import { Request, Response } from 'express';
import { ListLimitedCarsService } from '../../services/cars/ListLimitedCarsService';

class ListLimitedCarsController {
  async handle(request: Request, response: Response) {
    const listLimitedCarsService = new ListLimitedCarsService();
    const numOfCars = request.params.numOfCars;

    if (/^[0-9]{1,2}$/.test(numOfCars) === false || Number(numOfCars) <= 0) {
      return response
        .status(404)
        .json('Parameter must be a number between 1 and 99');
    }

    const cars = await listLimitedCarsService.execute(numOfCars);

    return response.json(cars);
  }
}

export { ListLimitedCarsController };
