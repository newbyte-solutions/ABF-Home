import mongoose, { Schema, model, InferSchemaType, Document } from "mongoose";

interface IArticle extends Document {
  _id: mongoose.Types.ObjectId;
  id: string;
  articleTitle: string;
  articleDescription: string;
  articleContent: string;
  articleAuthor: string;
  articlePublishedDate: Date;
  articleTags: string[];
  articleImageUrl: string;
  articleCompany: string;
  articleGrade: string;
}

const ArticleSchema: Schema = new Schema({
  articleTitle: { type: String, required: true },
  articleDescription: { type: String, required: true },
  articleContent: { type: String, required: true },
  articleAuthor: { type: String, required: true },
  articlePublishedDate: { type: Date, default: Date.now },
  articleTags: { type: [String], default: [] },
  articleImageUrl: { type: String, required: true },
  articleCompany: { type: String, required: true },
  articleGrade: { type: String, required: true },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

ArticleSchema.virtual('id').get(function(this: IArticle) {
  return this._id.toString();
});

const Article = mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;