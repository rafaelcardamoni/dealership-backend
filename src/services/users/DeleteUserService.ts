import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';

class DeleteUserService {
  async execute(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!(await usersRepository.findOne(id))) {
      throw new Error('Invalid id');
    }

    await usersRepository.delete(id);
  }
}

export { DeleteUserService };
