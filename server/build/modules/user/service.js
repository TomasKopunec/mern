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
const schema_1 = __importDefault(require("./schema"));
class UserService {
    createUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            const _session = new schema_1.default(user_params);
            return yield _session.save();
        });
    }
    filterUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.default.findOne(query);
        });
    }
    updateUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: user_params._id };
            return yield schema_1.default.findOneAndUpdate(query, user_params);
        });
    }
    deleteUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { _id: _id };
            return yield schema_1.default.deleteOne(query);
        });
    }
}
exports.default = UserService;
