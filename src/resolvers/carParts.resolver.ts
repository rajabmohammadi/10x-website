import prisma from "../config/database";
import pagination from "../utils/pagination";
const resolvers = {
    Query: {
        //get category list.
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
        searchOnCategory: async (_, args) => {
            try {
                let take = args.limit;
                let page = args.page;
                let search = args?.search;
                let skip = (args.page - 1) * take;
                let where = {
                    Title: { search: search },
                    Hersteller: { search: search },
                    Modell: { search: search },
                    PicURL: { search: search },
                    OEMR: { search: search },
                    OER: { search: search }
                }
                const [docs, totalDocs] = await Promise.all([
                    prisma.carparts.findMany({ where: { AND: [where, { Category: args.category }] }, skip, take }),
                    prisma.carparts.count({ where: { AND: [where, { Category: args.category }] } }),
                ]);
                let pageInfo = await pagination(totalDocs, take, page)
                return {
                    docs,
                    pageInfo
                }


            } catch (err) {
                console.log(err.message)
            }
        },
        search: async (_, args) => {
            try {
                let take = args.limit;
                let page = args.page;
                let search = args?.search;
                let skip = (args.page - 1) * take;
                let where = {
                    Title: { search: search },
                    Hersteller: { search: search },
                    Modell: { search: search },
                    PicURL: { search: search },
                    OEMR: { search: search },
                    OER: { search: search },
                }
                const [docs, totalDocs] = await Promise.all([
                    prisma.carparts.findMany({ where, skip, take }),
                    prisma.carparts.count({ where }),
                ]);
                let pageInfo = await pagination(totalDocs, take, page)
                return {
                    docs,
                    pageInfo
                }

            } catch (error) {
                throw new Error(error.message);
            }
        },
        getByCategory: async (_, args) => {
            try {
                let take = args.limit;
                let page = args.page;
                let skip = (args.page - 1) * take;
                const [docs, totalDocs] = await Promise.all([
                    prisma.carparts.findMany({
                        where: { Category: args.category }, skip, take
                    }),
                    prisma.carparts.count({
                        where: { Category: args.category }
                    }),
                ]);
                console.log(totalDocs)
                let pageInfo = await pagination(totalDocs, take, page)
                return {
                    docs,
                    pageInfo
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }
    },
    Mutation: {

    }

};
export default resolvers;