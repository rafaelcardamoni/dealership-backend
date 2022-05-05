import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';

class ListUsersService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = usersRepository.find();

    if (!user) {
      throw new Error('No users found');
    }

    return user;
  }
}

export { ListUsersService };
