import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/authentication/AuthenticateUserService';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const userInfo = await authenticateUserService.execute({ email, password });

    return response.json(userInfo);
  }
}

export { AuthenticateUserController };
