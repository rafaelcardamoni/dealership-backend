import { getCustomRepository } from 'typeorm';
import { CarsRepository } from '../../repositories/CarsRepository';

interface Car {
  make: string;
  model: string;
  trim: string;
  year: string;
  mileage: number;
  price: number;
  engine: string;
  transmission: string;
  power: number;
  fuel: string;
  city_consumption?: number;
  road_consumption?: number;
  range?: number;
  type: string;
  color: string;
}

class CreateCarService {
  async execute({
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
  }: Car): Promise<Error | Car> {
    const carsRepository = getCustomRepository(CarsRepository);

    // checking for empty fields
    if (
      !make ||
      !model ||
      !trim ||
      !year ||
      mileage === null ||
      !price ||
      !engine ||
      !transmission ||
      !power ||
      !fuel ||
      !type ||
      !color
    ) {
      throw new Error('The fields cannot be empty');
    }

    if (mileage < 0) {
      throw new Error('Mileage cannot be less than 0');
    }

    const car = await carsRepository.create({
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

    await carsRepository.save(car);

    return car;
  }
}

export { CreateCarService };
