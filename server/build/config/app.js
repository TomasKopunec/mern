"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const environment_1 = __importDefault(require("../environment"));
const common_routes_1 = require("../routes/common_routes");
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = require("../routes/user_routes");
class App {
    constructor() {
        this.common_routes = new common_routes_1.CommonRoutes();
        this.user_routes = new user_routes_1.UserRoutes();
        this.mongoUrl = 'mongodb://localhost/' + environment_1.default.getDBName();
        this.app = (0, express_1.default)();
        this.config();
        this.mongoSetup();
        this.user_routes.route(this.app);
        this.common_routes.route(this.app);
    }
    config() {
        // Support application/json type post data
        this.app.use(body_parser_1.default.json());
    }
    mongoSetup() {
        mongoose_1.default.connect(this.mongoUrl);
    }
}
exports.default = new App().app;
