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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const corsPermission = (0, cors_1.default)();
app.use(corsPermission);
app.use(express_1.default.json());
app.use('/', router_1.default);
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: '*'
    },
    transports: ['websocket', 'polling']
});
const port = process.env.PORT || 5000;
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    console.log('app working at: ' + port);
}));
