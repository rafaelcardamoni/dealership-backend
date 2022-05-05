import { EntityRepository, Repository } from 'typeorm';
import { Cars } from '../entities/Cars';
import { getCustomRepository } from 'typeorm';

@EntityRepository(Cars)
class CarsRepository extends Repository<Cars> {
  async getLimitedCars(numOfCars) {
    const carsRepository = getCustomRepository(CarsRepository);

    const cars = await carsRepository.find({
      relations: ['images'],
      order: {
        created_at: 'DESC'
      },
      skip: 0,
      take: Number(numOfCars)
    });

    return cars;
  }

  async getCarById(id) {
    const carsRepository = getCustomRepository(CarsRepository);

    const car = await carsRepository.find({
      where: { id },
      relations: ['images']
    });

    return car;
  }
}

export { CarsRepository };
