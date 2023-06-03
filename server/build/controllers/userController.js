"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const service_1 = require("../modules/common/service");
const service_2 = __importDefault(require("../modules/user/service"));
class UserController {
    constructor() {
        this.user_service = new service_2.default();
    }
    create_user(req, res) {
        // this check whether all the filds were send through the request or not
        if (req.body.name && req.body.name.first_name && req.body.name.middle_name && req.body.name.last_name &&
            req.body.email &&
            req.body.phone_number &&
            req.body.gender) {
            const user_params = {
                name: {
                    first_name: req.body.name.first_name,
                    middle_name: req.body.name.middle_name,
                    last_name: req.body.name.last_name
                },
                email: req.body.email,
                phone_number: req.body.phone_number,
                gender: req.body.gender,
                modification_note: {
                    modified_on: new Date(Date.now()),
                    modified_by: "null",
                    modification_note: 'New user created'
                }
            };
            this.user_service.createUser(user_params)
                .then((models) => {
                (0, service_1.successResponse)('Create user successfull', models, res);
            })
                .catch((err) => {
                (0, service_1.mongoError)(err, res);
            });
        }
        else {
            // error response if some fields are missing in request body
            (0, service_1.insufficientParameters)(res);
        }
    }
    get_user(req, res) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter)
                .then((data) => {
                (0, service_1.successResponse)('Get user successful', data, res);
            })
                .catch((err) => {
                (0, service_1.mongoError)(err, res);
            });
        }
        else {
            (0, service_1.insufficientParameters)(res);
        }
    }
    update_user(req, res) {
        if (req.params.id &&
            req.body.name || req.body.name.first_name || req.body.name.middle_name || req.body.name.last_name ||
            req.body.email ||
            req.body.phone_number ||
            req.body.gender) {
            const user_filter = { _id: req.params.id };
            this.user_service.filterUser(user_filter)
                .then((user_data) => {
                if (user_data) {
                    user_data.modification_note = {
                        modified_on: new Date(Date.now()),
                        modified_by: "null",
                        modification_note: 'User data updated'
                    };
                    const user_params = {
                        _id: req.params.id,
                        name: req.body.name ? {
                            first_name: req.body.name.first_name ? req.body.name.first_name : user_data.name.first_name,
                            middle_name: req.body.name.first_name ? req.body.name.middle_name : user_data.name.middle_name,
                            last_name: req.body.name.first_name ? req.body.name.last_name : user_data.name.last_name
                        } : {
                            first_name: user_data.name.first_name,
                            middle_name: user_data.name.middle_name,
                            last_name: user_data.name.last_name
                        },
                        email: req.body.email ? req.body.email : user_data.email,
                        phone_number: req.body.phone_number ? req.body.phone_number : user_data.phone_number,
                        gender: req.body.gender ? req.body.gender : user_data.gender,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
                        modification_note: {
                            modified_by: user_data.modification_note.modified_by,
                            modified_on: user_data.modification_note.modified_on,
                            modification_note: user_data.modification_note.modification_note,
                        }
                    };
                    this.user_service.updateUser(user_params)
                        .then(() => (0, service_1.successResponse)('update user successfull', null, res))
                        .catch(err => {
                        (0, service_1.mongoError)(err, res);
                    });
                }
                else {
                    (0, service_1.failureResponse)('Invalid user', null, res);
                }
            })
                .catch((err) => {
                (0, service_1.mongoError)(err, res);
            });
        }
        else {
            (0, service_1.insufficientParameters)(res);
        }
    }
    delete_user(req, res) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id)
                .then(details => {
                if (details.deletedCount !== 0) {
                    (0, service_1.successResponse)('delete user successfull', null, res);
                }
                else {
                    (0, service_1.failureResponse)('invalid user', null, res);
                }
            })
                .catch(err => {
                (0, service_1.mongoError)(err, res);
            });
        }
        else {
            (0, service_1.insufficientParameters)(res);
        }
    }
}
exports.UserController = UserController;
