import { getCustomRepository } from 'typeorm';
import { CarsRepository } from '../../repositories/CarsRepository';
import { ImagesRepository } from '../../repositories/ImagesRepository';
import aws from 'aws-sdk';

class DeleteCarService {
  async execute(id: string) {
    const carsRepository = getCustomRepository(CarsRepository);
    const imagesRepository = getCustomRepository(ImagesRepository);

    if (!(await carsRepository.findOne(id))) {
      return new Error('Invalid ID');
    }

    const images = await imagesRepository.find({
      select: ['id', 'filename'],
      where: {
        car_id: id
      }
    });

    images.forEach(async image => {
      // deleting image from aws
      const s3 = new aws.S3();
      s3.deleteObject({
        Bucket: 'dealership-project-upload-1',
        Key: image.filename
      }).promise();

      // deleting image from database
      await imagesRepository.delete(image.id);
    });

    await carsRepository.delete(id);
  }
}

export { DeleteCarService };
