import mongoose from 'mongoose';


export interface IEtudiant {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    dateNaissance: Date;
    sexe: string;
    niveau: string;
    filiere: string;
    matricule: string;
    createdAt: Date;
    updatedAt: Date;
}