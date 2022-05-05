import { response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CarsRepository } from '../../repositories/CarsRepository';

class DeleteCarService {
  async execute(id: string) {
    const carsRepository = getCustomRepository(CarsRepository);

    if (!(await carsRepository.findOne(id))) {
      return new Error('Invalid ID');
    }

    await carsRepository.delete(id);
  }
}

export { DeleteCarService };
