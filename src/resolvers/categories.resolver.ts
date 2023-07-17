import Categories_urls_collection from "../models/categories.model";
const resolvers = {
    Query: {
        categories: async () => {
            try {
                let data = await Categories_urls_collection.find({});
                return data;
            } catch (err) {
                console.log(err.message)
            }

        },
    },

};
export default resolvers;