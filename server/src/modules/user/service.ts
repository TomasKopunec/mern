import { IUser } from './model';
import users from './schema';

export default class UserService {

    public async createUser(user_params: IUser) {
        const _session = new users(user_params);
        return await _session.save();
    }

    public async filterUser(query: any) {
        return await users.findOne(query);
    }

    public async updateUser(user_params: IUser) {
        const query = { _id: user_params._id };
        return await users.findOneAndUpdate(query, user_params);
    }

    public async deleteUser(_id: String) {
        const query = { _id: _id };
        return await users.deleteOne(query);
    }

}