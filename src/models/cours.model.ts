import mongoose from "mongoose"
import { IEnseignant } from "./enseignant.model";
import { IEtudiant } from "./etudiant.model";

export interface ICours {
    _id: string;
    nom: string;
    code: string;
    filiere: string;
    semestre: string;
    anneeScolaire: string;
    enseignant: IEnseignant;
    etudiants: IEtudiant[];
    createdAt: Date;
    updatedAt: Date;
}



export type CoursDocument = mongoose.Document & ICours;


interface ICoursModel extends mongoose.Model<CoursDocument> {
    build(attr: ICours): CoursDocument;
}


const coursSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    filiere: {
        type: String,
        required: true
    },
    semestre: {
        type: String,
        required: true
    },
    anneeScolaire: {
        type: String,
        required: true
    },
    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    },
    etudiants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Etudiant'
    }]
}, {
    timestamps: true
});


const Cours = mongoose.model<CoursDocument, ICoursModel>('Cours', coursSchema);


export default Cours;