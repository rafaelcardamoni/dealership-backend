import { getCustomRepository } from 'typeorm';
import { CarsRepository } from '../../repositories/CarsRepository';

interface UpdateCar {
  id: string;
  make?: string;
  model?: string;
  trim?: string;
  year?: string;
  mileage?: number;
  price?: number;
  engine?: string;
  transmission?: string;
  power?: number;
  fuel?: string;
  city_consumption?: number;
  road_consumption?: number;
  range?: number;
  type?: string;
  color?: string;
}

class UpdateCarService {
  async execute({
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
  }: UpdateCar) {
    const carsRepository = getCustomRepository(CarsRepository);

    const car = await carsRepository.findOne(id);

    if (!car) {
      return new Error('The specified car does not exist');
    }

    // ternary for - if there is a value inside the parameter -> update the value, else -> keep the current value
    car.make = make ? make : car.make;
    car.model = model ? model : car.model;
    car.trim = trim ? trim : car.trim;
    car.year = year ? year : car.year;
    car.mileage = mileage ? mileage : car.mileage;
    car.price = price ? price : car.price;
    car.engine = engine ? engine : car.engine;
    car.transmission = transmission ? transmission : car.transmission;
    car.power = power ? power : car.power;
    car.fuel = fuel ? fuel : car.fuel;
    car.city_consumption = city_consumption
      ? city_consumption
      : car.city_consumption;
    car.road_consumption = road_consumption
      ? road_consumption
      : car.road_consumption;
    car.range = range ? range : car.range;
    car.type = type ? type : car.type;
    car.color = color ? color : car.color;

    await carsRepository.save(car);
    return car;
  }
}

export { UpdateCarService };
