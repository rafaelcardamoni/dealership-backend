import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthenticateUser {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: AuthenticateUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    // check if e-mail exists
    const user = await usersRepository.findOne({
      where: { email },
      select: ['fullname', 'email', 'password']
    });

    if (!user) {
      throw new Error('Email or password is incorrect');
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new Error('Email or password is incorrect');
    }

    const token = sign(
      {
        email: user.email
      },
      process.env.SECRET_KEY,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    );

    const userInfo = {
      name: user.fullname,
      email: user.email,
      token: token
    };

    return userInfo;
  }
}

export { AuthenticateUserService };
