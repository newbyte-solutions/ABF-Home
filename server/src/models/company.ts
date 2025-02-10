import mongoose, { Schema, Document, Int32 } from 'mongoose';

interface ICompany extends Document {
    name: string;
    description: string;
    students: string[];
    website: string;
    logo: string;
    tags: string[];
    phone: string;
    email: string;
    contactPerson: string;
    grade: Int32;
    founded: Date;
    createdAt: Date;
}

const CompanySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    students: [{
        type: String,
        required: false,
    }],
    website: {
        type: String,
        required: true,
        trim: true,
    },
    logo: {
        type: String,
        required: false,
        trim: true,
    },
    tags: [{
        type: String,
        required: false,
    }],
    phone: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    contactPerson: {
        type: String,
        required: false,
        trim: true,
    },
    grade: {
        type: Number,
        required: false,
    },
    founded: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;