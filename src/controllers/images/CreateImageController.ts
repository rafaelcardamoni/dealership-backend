import { Request, Response } from 'express';
import { CreateImageService } from '../../services/images/CreateImageService';

class CreateImageController {
  async handle(request: Request, response: Response) {
    const createImageService = new CreateImageService();
    const { car_id } = request.params;
    const { key: filename, location: path } = request.file;

    const image = await createImageService.execute({ filename, path, car_id });

    if (image instanceof Error) {
      return response.status(404).json({ error: image.message });
    }

    return response.json(image);
  }
}

export { CreateImageController };
