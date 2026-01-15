"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_1 = require("drizzle-orm/libsql/node");
require("dotenv/config");
exports.db = (0, node_1.drizzle)({
    connection: {
        url: process.env.DATABASE_URL,
        authToken: process.env.DATABASE_AUTH_TOKEN,
    },
});
