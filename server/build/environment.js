"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Environment {
    getPort() {
        return 8000;
    }
    getDBName() {
        return 'db_dev';
    }
}
exports.default = new Environment();
