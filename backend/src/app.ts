import { Application, Request, Response } from "express";
import { ApiController } from "./controllers/api-controller";
import { EditController } from "./controllers/edit-controller";
import { HttpException } from "./errors";
import { SpellCheck } from "./services/spellcheck";

const express = require('express');
const cors = require('cors')
const serverless = require('serverless-http');

const app: Application = express();

const spellCheck = new SpellCheck();

const controllers: ApiController[] = [new EditController(spellCheck)];

app.use(cors({
    origin: 'null',
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

type Handler = (req: Request, res: Response) => Promise<void>;

controllers.forEach((controller) => {
    app.post(controller.path, withExceptionHandling(controller.post.bind(controller)));
});

function withExceptionHandling(handler: Handler): Handler {
    return async (req: Request, res: Response) => {
        try {
            await handler(req, res);
        } catch (err: any) {
            if (err instanceof HttpException) {
                res.statusCode = err.statusCode;
                res.send({ error: err.message });
            } else {
                console.error('HANDLED ERROR', err);
                res.statusCode = 500;
                res.send({ error: 'Something is wrong.' });
            }
        }
    };
}

const server = serverless(app);

module.exports.handler = (event: any, context: any) => {
    const url: string = event.url;

    const newPath = url.endsWith('?') ? url.slice(0, url.length - 1) : url;

    const patchedEvent = {
        ...event,
        path: newPath,
        originalPath: event.path,
    };
    return server(patchedEvent, context);
}
