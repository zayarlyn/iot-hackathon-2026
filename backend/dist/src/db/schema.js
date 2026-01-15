"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceTable = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.deviceTable = (0, sqlite_core_1.sqliteTable)('device', {
    id: (0, sqlite_core_1.int)().primaryKey({ autoIncrement: true }),
    wash_threshold: (0, sqlite_core_1.int)().notNull(),
    rinse_threshold: (0, sqlite_core_1.int)().notNull(),
    spin_threshold: (0, sqlite_core_1.int)().notNull(),
    status: (0, sqlite_core_1.text)().notNull(),
});
