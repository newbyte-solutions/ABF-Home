import mongoose, { Schema, Document, Int32 } from "mongoose";

interface ICompany extends Document {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyContactPerson: string;
  companyRegistrationDate: Date;
  companyGrade: Int32;
  companyLogo: string;
  companyStudents: string[];
  companyWebsite: string;
  companyDescription: string;
  companyTags: string[];
  companyCreatedAt: Date;
}

const CompanySchema: Schema = new Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  companyDescription: {
    type: String,
    required: true,
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
    required: true,
    trim: true,
  },
  companyLogo: {
    type: String,
    required: false,
    trim: true,
  },
  companyTags: [
    {
      type: String,
      required: false,
    },
  ],
  companyPhone: {
    type: String,
    required: false,
    trim: true,
  },
  companyEmail: {
    type: String,
    required: false,
    trim: true,
  },
  companyContactPerson: {
    type: String,
    required: false,
    trim: true,
  },
  companyGrade: {
    type: Number,
    required: false,
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
