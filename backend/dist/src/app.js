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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = require("./db");
const schema_1 = require("./db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Welcome to my Soul Society');
});
app.post('/update-status/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id || 1;
    yield db_1.db.update(schema_1.deviceTable).set(req.body).where((0, drizzle_orm_1.eq)(schema_1.deviceTable.id, id));
    return res.json({ message: 'Status updated' });
}));
app.get('/get-status/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id || 1;
    const device = yield db_1.db.select().from(schema_1.deviceTable).where((0, drizzle_orm_1.eq)(schema_1.deviceTable.id, id));
    return res.json(device);
}));
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
});
