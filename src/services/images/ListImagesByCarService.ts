import { getCustomRepository } from 'typeorm';
import { CarsRepository } from '../../repositories/CarsRepository';
import { ImagesRepository } from '../../repositories/ImagesRepository';

interface ImageId {
  id: string;
}

class ListImagesByCarService {
  async execute({ id }: ImageId) {
    const imagesRepository = getCustomRepository(ImagesRepository);
    const carsRepository = getCustomRepository(CarsRepository);

    const car = await carsRepository.findOne({ id });

    if (!car) {
      return new Error('Car does not exist');
    }

    const images = await imagesRepository.find({
      select: ['path'],
      where: {
        car_id: id
      }
    });

    return images;
  }
}

export { ListImagesByCarService };
