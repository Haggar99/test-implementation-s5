import mongoose from 'mongoose';
import { Sexe } from './enseignant.model';


export interface IEtudiant {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    dateNaissance: Date;
    sexe: Sexe;
    niveau: string;
    filiere: string;
    matricule: string;
    createdAt: Date;
    updatedAt: Date;
}

export type EtudiantDocument = mongoose.Document & IEtudiant;


interface IEtudiantModel extends mongoose.Model<EtudiantDocument> {
    build(attr: IEtudiant): EtudiantDocument;
}



const etudiantSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    dateNaissance: {
        type: Date,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    niveau: {
        type: String,
        required: true
    },
    filiere: {
        type: String,
        required: true
    },
    matricule: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const Etudiant = mongoose.model<EtudiantDocument, IEtudiantModel>('Etudiant', etudiantSchema);

export default Etudiant;

