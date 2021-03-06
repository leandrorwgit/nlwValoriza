import { getCustomRepository } from "typeorm";
import { HttpError } from "../exceptions/httpError";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean
}

class CreateUserService {

  async execute({ name, email, password, admin = false} : IUserRequest) {
    if (!email) {
      throw new HttpError(400, "Email incorrect");
    }

    const usersRepositories = getCustomRepository(UsersRepositories);
    const userExists = await usersRepositories.findOne({ email });
    if (userExists) {
      throw new HttpError(400, `User ${name} already exists`);
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepositories.create({ 
      name, 
      email, 
      password: passwordHash, 
      admin });
    await usersRepositories.save(user)
    
    return user;
  }

}

export { CreateUserService }