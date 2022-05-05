import { getCustomRepository } from 'typeorm';
import { CarsRepository } from '../../repositories/CarsRepository';

class ListLimitedCarsService {
  async execute(numOfCars: string) {
    const carsRepository = getCustomRepository(CarsRepository);

    const cars = carsRepository.getLimitedCars(numOfCars);

    return cars;
  }
}

export { ListLimitedCarsService };
