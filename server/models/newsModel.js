const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            trim: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "news",
    }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
 