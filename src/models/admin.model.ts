import mongoose from "mongoose";
import { Sexe, Status } from "./enseignant.model";


export interface IAdmin {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    status: Status;
    sexe: Sexe;
    password: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}

export type AdminDocument = mongoose.Document & IAdmin;


interface IAdminModel extends mongoose.Model<AdminDocument> {
    build(attr: IAdmin): AdminDocument;
}



const adminSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: Status,
        required: true
    },
    sexe: {
        type: Sexe,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
});


const Admin = mongoose.model<AdminDocument, IAdminModel>('Admin', adminSchema);

export default Admin;