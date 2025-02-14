import mongoose, { Document, Schema } from "mongoose";

interface IArticle extends Document {
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
});

const Article = mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
