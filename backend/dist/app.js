"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const edit_controller_1 = require("./controllers/edit-controller");
const errors_1 = require("./errors");
const spellcheck_1 = require("./services/spellcheck");
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();
const spellCheck = new spellcheck_1.SpellCheck();
const controllers = [new edit_controller_1.EditController(spellCheck)];
app.use(cors({
    origin: 'null',
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
controllers.forEach((controller) => {
    app.post(controller.path, withExceptionHandling(controller.post.bind(controller)));
});
function withExceptionHandling(handler) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield handler(req, res);
        }
        catch (err) {
            if (err instanceof errors_1.HttpException) {
                res.statusCode = err.statusCode;
                res.send({ error: err.message });
            }
            else {
                console.error('HANDLED ERROR', err);
                res.statusCode = 500;
                res.send({ error: 'Something is wrong.' });
            }
        }
    });
}
const server = serverless(app);
module.exports.handler = (event, context) => {
    const url = event.url;
    const newPath = url.endsWith('?') ? url.slice(0, url.length - 1) : url;
    const patchedEvent = Object.assign(Object.assign({}, event), { path: newPath, originalPath: event.path });
    return server(patchedEvent, context);
};
