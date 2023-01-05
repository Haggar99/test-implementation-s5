import mongoose from 'mongoose';
import { IEtudiant } from './etudiant.model';

export enum Sexe {
    M = "M",
    F = "F"
}

export enum Grade {
    Maitre = "Maitre",
    Doctorant = "Doctorant",
    Professeur = "Professeur"
}

export enum Status {
    Actif = "Actif",
    Inactif = "Inactif"
}

export enum TypeEnseignant {
    Permanent = "Permanent",
    Vacataire = "Vacataire"
}

export interface IEnseignant {
    _id: string;
    nom: string;
    prenom: string;
    phone: string;
    sexe: Sexe;
    matricule: string;
    email: string;
    password: string;
    grade: Grade;
    status: Status;
    type: TypeEnseignant;
}




export type EnseignantDocument = mongoose.Document & IEnseignant;


interface IEnseignantModel extends mongoose.Model<EnseignantDocument> {
    build(attr: IEnseignant): EnseignantDocument;
}



const enseignantSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    sexe: {
        type: Sexe,
        required: true
    },
    matricule: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    grade: {
        type: Grade,
        required: true
    },
    status: {
        type: Status,
        required: true
    },
    type: {
        type: TypeEnseignant,
        required: true
    }
}, {
    timestamps: true
});



const Enseignant = mongoose.model<EnseignantDocument, IEnseignantModel>('Enseignant', enseignantSchema);


export default Enseignant;