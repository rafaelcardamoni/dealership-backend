import { Request, Response } from 'express';
import { ListImagesByCarService } from '../../services/images/ListImagesByCarService';

class ListImagesByCarController {
  async handle(request: Request, response: Response) {
    const listImagesByCarService = new ListImagesByCarService();
    const { id } = request.params;

    const images = await listImagesByCarService.execute({ id });

    if (images instanceof Error) {
      return response.status(404).json(images.message);
    }

    return response.json(images);
  }
}

export { ListImagesByCarController };
