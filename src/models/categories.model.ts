import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
const Categories_urls_collection: Schema = new Schema(
    {
        "Category_URL": {
            type: String
        },
    },
    { timestamps: true }
);
Categories_urls_collection.plugin(paginate);
export default model("Categories_urls_collection", Categories_urls_collection, "Categories_urls_collection");
