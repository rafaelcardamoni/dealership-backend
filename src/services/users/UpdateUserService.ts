import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';
import { hash } from 'bcryptjs';

interface User {
  id: string;
  fullname?: string;
  email?: string;
  password?: string;
}

class UpdateUserService {
  async execute({ id, fullname, email, password }: User) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new Error('Invalid user');
    }

    user.fullname = fullname ? fullname : user.fullname;
    user.email = email ? email : user.email;

    if (password) {
      const passwordHash = await hash(password, 10);
      user.password = passwordHash;
    } else user.password;

    await usersRepository.save(user);

    return user;
  }
}

export { UpdateUserService };
