import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const verifyAdminUser = this.usersRepository.findById(user_id);

    if (!verifyAdminUser) {
      throw new Error("User not found");
    }

    if (!verifyAdminUser.admin) {
      throw new Error("Access denied");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
