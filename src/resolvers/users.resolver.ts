import bcrypt from "bcrypt";
import config from "../config/config";
import prisma from "../config/database";
import authMiddleware from "../middleware/auth.middleware";
import Auth from "../services/jwt.service";
import mailer from "../utils/mailer";
const resolvers = {
    Query: {
        users: async () => {
            // return usersModel.findMany("user")
            return await prisma.users.findMany();
        },
        viewProfile: async (_, __, contextValue) => {
            let userData: any = await authMiddleware.validAccessToken(contextValue);
            let user = await prisma.users.findUnique({ where: { email: userData.email } });
            return user;
        }
    },
    Mutation: {
        async register(_, { body: args }) {
            try {
                const oldUser = await prisma.users.findUnique({
                    where: {
                        email: args.email
                    },
                })
                if (oldUser) {
                    throw new Error(config.message.user.userExist)
                }
                let encryptPassword = await bcrypt.hash(args.password, 10)
                const user = await prisma.users.create({
                    data: {
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email,
                        phoneNumber: args.phoneNumber,
                        password: encryptPassword,
                        privateCustomer: args.privateCustomer,
                        isCompany: args.isCompany,
                        workshopName: args.workshopName,
                        salesTaxNumber: args.salesTaxNumber,
                        country: args.country,
                        invoiceEmail: args.invoiceEmail,
                        requisitionNumber: args.requisitionNumber,
                        newsLetter: args.newsLetter
                    }
                })
                let token = await Auth.createJWT(user)
                return { user, token }
            } catch (error) {
                throw new Error(error.message)
            }
        },

        async login(_, { body: { email, password } }) {
            try {
                //find the user
                const user = await prisma.users.findUnique({ where: { email: email } })
                if (user) {
                    //check password
                    if ((await bcrypt.compare(password, user.password))) {
                        let token = await Auth.createJWT(user)
                        return { token, user };
                    } else {
                        throw new Error(config.message.user.wrongPassword)
                    }
                } else {
                    throw new Error(config.message.user.notFound)
                }

            } catch (error) {
                throw new Error(error.message)
            }
        },
        async updateProfile(_, { body: args }, contextValue) {
            try {
                let userData: any = await authMiddleware.validAccessToken(contextValue);
                const user = await prisma.users.update({ where: { email: userData.email }, data: args })
                return user;
            } catch (error) {
                throw new Error(error.message)
            }
        },
        //change password
        async changePassword(_, { body: { oldPassword, newPassword } }, contextValue) {
            try {
                let userData: any = await authMiddleware.validAccessToken(contextValue);
                //match old password
                if (userData && (await bcrypt.compare(oldPassword, userData.password))) {
                    //encrypt the new password
                    let encryptPassword = await bcrypt.hash(newPassword, 10)
                    //update the password
                    const user = await prisma.users.update({ where: { email: userData.email }, data: { password: encryptPassword } })
                    return user;
                } else {
                    throw new Error(config.message.user.oldPassword)
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async forgotPassword(_, { email }, contextValue) {
            try {
                //match old password
                await mailer.forgotEmail(email, "Forgot Password", "Hello body")
            } catch (error) {
                throw new Error(error.message)
            }
        },

    }

}
export default resolvers;