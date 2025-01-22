import mongoose, { Schema, Document } from 'mongoose';

interface ICompany extends Document {
    name: string;
    description: string;
    founded: Date;
    website: string;
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
    founded: {
        type: Date,
        required: true,
    },
    website: {
        type: String,
        required: true,
        trim: true,
    },
});

const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;
