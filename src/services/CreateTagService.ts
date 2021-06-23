import { getCustomRepository } from "typeorm";
import { HttpError } from "../exceptions/httpError";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {

  async execute(name: string) {
    if (!name) {
      throw new HttpError(400, "Name incorrect");
    }

    const tagsRepositories = getCustomRepository(TagsRepositories);
    const tagExists = await tagsRepositories.findOne({ name });
    if (tagExists) {
      throw new HttpError(400, `Tag ${name} already exists1`);
    }

    const tag = tagsRepositories.create({ name });
    await tagsRepositories.save(tag);
    
    return tag;
  }

}

export { CreateTagService }