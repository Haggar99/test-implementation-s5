import mongoose from 'mongoose';
import { ICours } from './cours.model';
import { IEtudiant } from './etudiant.model';

export enum TypeNote {
    CC = "CC",
    Session = "Session"
}


export interface INote {
    _id: string;
    note: number;
    typeNote: TypeNote;
    cours: ICours;
    etudiant: IEtudiant;
    createdAt: Date;
    updatedAt: Date;
}

export type NoteDocument = mongoose.Document & INote;

interface INoteModel extends mongoose.Model<NoteDocument> {
    build(attr: INote): NoteDocument;
}



const noteSchema = new mongoose.Schema({
    note: {
        type: Number,
        required: true
    },
    typeNote: {
        type: String,
        required: true
    },
    cours: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cours',
        required: true
    },
    etudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Etudiant',
        required: true
    }
}, {
    timestamps: true
});


const Note = mongoose.model<NoteDocument, INoteModel>('Note', noteSchema);

export default Note;