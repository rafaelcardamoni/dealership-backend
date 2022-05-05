import { Request, response, Response } from 'express';
import { DeleteCarService } from '../../services/cars/DeleteCarService';

class DeleteCarController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteCarService = new DeleteCarService();

    const result = await deleteCarService.execute(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json(`${id} was successfully deleted`);
  }
}

export { DeleteCarController };
