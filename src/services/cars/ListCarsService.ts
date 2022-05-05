import { getCustomRepository } from 'typeorm';
import { CarsRepository } from '../../repositories/CarsRepository';

class ListCarService {
  async execute() {
    const carsRepository = getCustomRepository(CarsRepository);

    const cars = await carsRepository.find({
      relations: ['images'],
      order: {
        created_at: 'DESC'
      }
    });

    return cars;
  }
}

export { ListCarService };
