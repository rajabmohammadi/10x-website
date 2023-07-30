import prisma from "../config/database";
import active_listing from "../models/headlights.model";
const resolvers = {
    Query: {
        carParts: async (_, args) => {
            try {
                console.log(args)
                const parts = await prisma.used_carparts.findMany(args);
                return parts
            } catch (err) {
                console.log(err.message)
            }

        },
    },
    Mutation: {
        addHeadlights: async (_, args) => {
            const headlights = new active_listing({
                Title: args.title,
                SKU: args.sku
            });
            return await headlights.save();
        }
    }

};
export default resolvers;