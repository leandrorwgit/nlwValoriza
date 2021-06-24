import { getCustomRepository } from "typeorm";
import { HttpError } from "../exceptions/httpError";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string
}

class CreateComplimentService {

  async execute({ tag_id, user_sender, user_receiver, message } : IComplimentRequest) {
    if (!message) {
      throw new HttpError(400, "Message incorrect");
    }

    if (user_sender === user_receiver) {
      throw new HttpError(400, "Incorrect user receiver.");
    }

    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    const userReceiverExists = await usersRepositories.findOne(user_receiver);
    if (!userReceiverExists) {
      throw new HttpError(400, "User receiver not exists.");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });
    await complimentsRepositories.save(compliment);
    return compliment;
  }

}

export { CreateComplimentService }