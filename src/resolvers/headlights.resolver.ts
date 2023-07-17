import active_listing from "../models/headlights.model";
const resolvers = {
    Query: {
        headlights: async (_, args) => {
            try {
                let page: number = parseInt(args.page) ? parseInt(args.page) : 1;
                let limit: number = parseInt(args.limit) ? parseInt(args.limit) : 10;
                const skip = (page - 1) * limit;
                const users = await active_listing.find().skip(skip).limit(limit).exec();
                const totalCount = await active_listing.countDocuments().exec();
                const totalPage = totalCount / limit;
                const hasNextPage = skip + limit < totalCount;
                const hasPreviousPage = skip > 0;
                const edges = users.map((user) => ({
                    node: user,
                    cursor: user.ItemID, // Use a unique identifier as the cursor
                }));
                // let page: number = parseInt(args.page) ? parseInt(args.page) : 1;
                // let limit: number = parseInt(args.limit) ? parseInt(args.limit) : 10;
                // let option = {page,limit}
                // let data = await active_listing.find({}, option);
                // return data;
                // return users;
                return {
                    pageInfo: {
                        hasNextPage,
                        hasPreviousPage,
                        page,
                        totalPage,
                        startCursor: edges.length > 0 ? edges[0].cursor : null,
                        endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
                    },
                    edges,
                };
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