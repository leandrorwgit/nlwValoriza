import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm"
import { HttpError } from "../exceptions/httpError";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    
    const user = await usersRepositories.findOne({ email });
    if (!user) {
      throw new HttpError(401, "Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpError(401, "Email/Password incorrect");
    }

    const token = sign({ 
      email: user.email
    }, "CHAVE_SECRETA", { 
      subject: user.id,
      expiresIn: "1d"
    });

    return token;
  }

}

export { AuthenticateUserService }