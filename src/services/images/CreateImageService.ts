import { getCustomRepository } from 'typeorm';
import { CarsRepository } from '../../repositories/CarsRepository';
import { ImagesRepository } from '../../repositories/ImagesRepository';

interface Image {
  filename: string;
  path: string;
  car_id: string;
}

class CreateImageService {
  async execute({ filename, path, car_id }: Image) {
    const carsRepository = getCustomRepository(CarsRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);

    const car = await carsRepository.findOne(car_id).catch(() => {
      console.log('Invalid car id, deleting the image from AWS');
    });

    if (!car) {
      await imagesRepository.deleteImageFromBucket(filename);
      return new Error('Invalid car id, deleting the image from AWS');
    }

    if (!path) {
      await imagesRepository.deleteImageFromBucket(filename);
      return new Error('The image URL could not be retrieved');
    }

    const image = await imagesRepository.create({
      filename,
      path,
      car_id
    });

    await imagesRepository.save(image);

    const imageExists = await imagesRepository.findOne({ filename });

    if (!imageExists) {
      await imagesRepository.deleteImageFromBucket(filename);
      return new Error(
        'Image was not present in the database and AWS. Exiting function'
      );
    }

    return image;
  }
}
export { CreateImageService };
