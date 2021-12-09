import { Request, Response } from "express";

export class ApiController {

    path: string;

    constructor(path: string) {
        this.path = `/api${path}`;
    }

    public async post (req: Request, res: Response): Promise<void> {

    }
}
