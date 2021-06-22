import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean
}

class CreateUserService {

  async execute({ name, email, password, admin} : IUserRequest) {
    if (!email) {
      throw new Error("Email incorrect");
    }

    const usersRepositories = getCustomRepository(UsersRepositories);
    const userExists = await usersRepositories.findOne({ email });
    if (userExists) {
      throw new Error(`User ${name} already exists`);
    }

    const user = usersRepositories.create({ name, email, password, admin });
    await usersRepositories.save(user)
    
    return user;
  }

}

export { CreateUserService }