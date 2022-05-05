import { Request, Response } from 'express';
import { CreateUserService } from '../../services/users/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { fullname, email, password, admin } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ fullname, email, password, admin });

    return response.json(user);
  }
}

export { CreateUserController };
