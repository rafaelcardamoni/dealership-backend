import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ImagesRepository } from '../../repositories/ImagesRepository';
import { DeleteImageService } from '../../services/images/DeleteImageService';
import aws from 'aws-sdk';

class DeleteImageController {
  async handle(request: Request, response: Response) {
    const id: string = request.params.id;

    const imagesRepository = getCustomRepository(ImagesRepository);
    const image = await imagesRepository.findOne(id);

    // deleting image from amazon s3 bucket
    const s3 = new aws.S3();
    s3.deleteObject({
      Bucket: 'dealership-project-upload-1',
      Key: image.filename
    }).promise();

    const deleteImageService = new DeleteImageService();

    if ((await deleteImageService.execute(id)) instanceof Error) {
      return response.status(404).json((await deleteImageService.execute(id)).message);
    }

    return response.json(`${id} sucessfully deleted`);
  }
}

export { DeleteImageController };
