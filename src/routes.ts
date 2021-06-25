import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentController } from "./controllers/ListUserSendComplimentController";
import { ListUserReceiverComplimentController } from "./controllers/ListUserReceiverComplimentController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const authenticateUserController = new AuthenticateUserController();
router.post("/login", authenticateUserController.handle);

const createUserController = new CreateUserController();
router.post("/users", createUserController.handle);

const createTagController = new CreateTagController();
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);

const createComplimentController = new CreateComplimentController();
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

const listUserSendComplimentController = new ListUserSendComplimentController();
router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentController.handle);

const listUserReceiverComplimentController = new ListUserReceiverComplimentController();
router.get("/users/compliments/receiver", ensureAuthenticated, listUserReceiverComplimentController.handle);

const listTagsController = new ListTagsController();
router.get("/tags", ensureAuthenticated, listTagsController.handle);

const listUsersController = new ListUsersController();
router.get("/users", ensureAuthenticated, listUsersController.handle);

export { router }