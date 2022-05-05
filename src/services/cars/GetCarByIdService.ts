import { getCustomRepository } from 'typeorm';
import { CarsRepository } from '../../repositories/CarsRepository';

interface Car {
  id: string;
}

class GetCarByIdService {
  async execute({ id }) {
    const carsRepository = getCustomRepository(CarsRepository);

    const car = await carsRepository.getCarById(id);

    if (car.length === 0) {
      return new Error('Invalid ID');
    }

    return car;
  }
}

export { GetCarByIdService };
