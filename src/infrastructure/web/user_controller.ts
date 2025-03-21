import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async createUser(req: Request, res: Response): Promise<Response> {

        if (!req.body.name) {
            return res
                .status(400)
                .json({ message: "O campo nome é obrigatório." });
        }

        const dto = {
            name: req.body.name,
        };

        const user = await this.userService.createUser(dto);

        return res.status(201).json(user);
    }
};