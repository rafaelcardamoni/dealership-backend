import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface User {
  fullname: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ fullname, email, password, admin = false }: User) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({ email });

    console.log(userExists);

    if (userExists) {
      throw new Error('Email address already in use');
    }

    const passwordHash = await hash(password, 10);

    const user = usersRepository.create({
      fullname,
      email,
      password: passwordHash,
      admin
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
