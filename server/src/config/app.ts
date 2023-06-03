import bodyParser from "body-parser";
import express from "express";
import environment from "../environment";
import { CommonRoutes } from "../routes/common_routes";
import mongoose from "mongoose";
import { UserRoutes } from "../routes/user_routes";

class App {
    public app: express.Application;
    private common_routes: CommonRoutes = new CommonRoutes();
    private user_routes: UserRoutes = new UserRoutes();

    public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.user_routes.route(this.app);
        this.common_routes.route(this.app);
    }

    private config(): void {
        // Support application/json type post data
        this.app.use(bodyParser.json());
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl);
    }
}
export default new App().app;