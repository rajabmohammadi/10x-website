import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
const active_listing: Schema = new Schema(
    {
        "SKU": {
            type: String
        },
        "allegro_price": {
            type: String
        },
        "*CategoryID": {
            type: String
        },
        "*ConditionID": {
            type: String
        },
        "*Title": {
            type: String
        },
        "*C:Hersteller": {
            type: String
        },
        "C:Modell": {
            type: String
        },
        "C:Beleuchtungstechnik": {
            type: String
        },
        "C:Vergleichsnummer": {
            type: String
        },
        "*C:Einbauposition": {
            type: String
        },
        "C:Herstellernummer": {
            type: String
        },
        "*C:OE/OEM Referenznummer(n)": {
            type: String
        },
        "Image_URLs": {
            type: String
        },
        "New_Price": {
            type: String
        },
        "ItemID": {
            type: String
        }
    },
    { timestamps: true }
);
active_listing.plugin(paginate);
export default model("active_listing", active_listing, "active_listing");
