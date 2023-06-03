import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import UserService from '../modules/user/service';
import e = require('express');
import { IUser } from '../modules/user/model';

export class UserController {
    private user_service: UserService = new UserService();

    public create_user(req: Request, res: Response) {
        // this check whether all the filds were send through the request or not
        if (req.body.name && req.body.name.first_name && req.body.name.middle_name && req.body.name.last_name &&
            req.body.email &&
            req.body.phone_number &&
            req.body.gender) {
            const user_params: IUser = {
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
                    successResponse('Create user successfull', models, res);
                })
                .catch((err) => {
                    mongoError(err, res);

                });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_user(req: Request, res: Response) {
        if (req.params.id) {
            const user_filter = { _id: req.params.id };

            this.user_service.filterUser(user_filter)
                .then((data) => {
                    successResponse('Get user successful', data, res);
                })
                .catch((err) => {
                    mongoError(err, res);
                });
        } else {
            insufficientParameters(res);
        }
    }

    public update_user(req: Request, res: Response) {
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
                        }
                        const user_params: IUser = {
                            _id: req.params.id,
                            name: req.body.name ? {
                                first_name: req.body.name.first_name ? req.body.name.first_name : user_data.name!.first_name,
                                middle_name: req.body.name.first_name ? req.body.name.middle_name : user_data.name!.middle_name,
                                last_name: req.body.name.first_name ? req.body.name.last_name : user_data.name!.last_name
                            } : {
                                first_name: user_data.name!.first_name,
                                middle_name:user_data.name!.middle_name,
                                last_name: user_data.name!.last_name
                            },
                            email: req.body.email ? req.body.email : user_data.email,
                            phone_number: req.body.phone_number ? req.body.phone_number : user_data.phone_number,
                            gender: req.body.gender ? req.body.gender : user_data.gender,
                            is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
                            modification_note: {
                                modified_by: user_data.modification_note!.modified_by!,
                                modified_on: user_data.modification_note!.modified_on!,
                                modification_note: user_data.modification_note!.modification_note!,
                            }
                        };

                        this.user_service.updateUser(user_params)
                            .then(() => successResponse('update user successfull', null, res))
                            .catch(err => {
                                mongoError(err, res);
                            })
                    } else {
                        failureResponse('Invalid user', null, res);
                    }
                })
                .catch((err) => {
                    mongoError(err, res);
                });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_user(req: Request, res: Response) {
        if (req.params.id) {
            this.user_service.deleteUser(req.params.id)
                .then(details => {
                    if (details.deletedCount !== 0) {
                        successResponse('delete user successfull', null, res);
                    } else {
                        failureResponse('invalid user', null, res);
                    }
                })
                .catch(err => {
                    mongoError(err, res);
                })
        } else {
            insufficientParameters(res);
        }
    }
}