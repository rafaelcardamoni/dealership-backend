import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/users/UpdateUserService';

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { fullname, email, password } = request.body;

    if (!id) {
      return response.status(404).json('Invalid id');
    }

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({ id, fullname, email, password });

    return response.json(user);
  }
}

export { UpdateUserController };
