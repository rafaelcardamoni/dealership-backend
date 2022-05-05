import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/users/DeleteUserService';

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute(id);

    return response.json(`${id} successfully deleted`);
  }
}

export { DeleteUserController };
