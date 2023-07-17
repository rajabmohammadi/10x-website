import jwt from "jsonwebtoken";
import config from "../config/config";
const jwtSecret: string = process.env.JWT_SECRET;
class AuthMiddleware {
    async validAccessToken(req) {
        if (!req.headers["authorization"]) {
            throw new Error(config.message.user.noAuth)
        }
        const authorization = req.headers["authorization"].split(" ");
        //check if authorization is Bearer
        if (authorization[0] !== "Bearer") {
            throw new Error(config.message.user.invalidToken)
        }
        let user = jwt.verify(authorization[1], jwtSecret);
        if (!user) throw new Error(config.message.user.notFound)
        return user;
    }
}
export default new AuthMiddleware();