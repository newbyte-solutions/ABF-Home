import mongoose, { Schema, Document, Int32 } from "mongoose";

interface ICompany extends Document {
  _id: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyContactPerson: string;
  companyGrade: Int32;
  companyLogo: string;
  companyStudents: string[];
  companyWebsite: string;
  companyDescription: string;
  companyContent: string;
  companyFounded: Date;
  companyTags: string[];
  companyCreatedAt: Date;
}

const CompanySchema: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  companyDescription: {
    type: String,
    required: false,
    trim: true,
  },
  companyContent: {
    type: String,
    required: false,
    trim: true,
  },
  companyStudents: [
    {
      type: String,
      required: false,
    },
  ],
  companyWebsite: {
    type: String,
    required: false,
    trim: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  companyTags: [
    {
      type: String,
      required: false,
    },
  ],
  companyPhone: {
    type: String,
    required: true,
    trim: true,
  },
  companyEmail: {
    type: String,
    required: true,
    trim: true,
  },
  companyContactPerson: {
    type: String,
    required: true,
    trim: true,
  },
  companyGrade: {
    type: Number,
    required: true,
  },
  companyFounded: {
    type: Date,
    required: true,
  },
  companyCreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model<ICompany>("Company", CompanySchema);

export default Company;