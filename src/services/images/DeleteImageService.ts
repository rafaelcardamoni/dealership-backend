import { getCustomRepository } from 'typeorm';
import { ImagesRepository } from '../../repositories/ImagesRepository';

class DeleteImageService {
  async execute(id: string) {
    const imagesRepository = getCustomRepository(ImagesRepository);

    const image = imagesRepository.findOne(id);

    if (!image) {
      return new Error('Image not found');
    }

    await imagesRepository.delete(id);
  }
}

export { DeleteImageService };
