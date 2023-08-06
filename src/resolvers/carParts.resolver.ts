import prisma from "../config/database";
import active_listing from "../models/headlights.model";
const resolvers = {
    Query: {
        // group by category
        categoryList: async () => {
            try {
                const categories = await prisma.carparts.groupBy({
                    by: ["Category"],
                    _count: {
                        CustomLabel: true
                    },
                });
                console.log(categories)
                return categories
            } catch (err) {
                console.log(err.message)
            }

        },
        searchCarParts: async (_, { filter: args }) => {
            try {
                let skip = 0;
                let take = 20;
                if (args?.skip) skip = args.skip;
                if (args?.take) take = args.take;
                if (args?.search) {
                    let regex = new RegExp(`${args.search}`, "gi")
                    const parts = await prisma.carparts.findMany({
                        where: {
                            Title: { search: `${regex}` },
                            Hersteller: { search: `${regex}` },
                            Modell: { search: `${regex}` },
                            PicURL: { search: `${regex}` },
                            OEMR: { search: `${regex}` },
                            OER: { search: `${regex}` },
                        },
                        take, skip
                    });
                    return parts;
                } else {
                    const parts = await prisma.carparts.findMany({ skip, take });
                    return parts;
                }


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