import { Request, Response } from "express";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";

import Etudiant, { EtudiantDocument } from "../models/etudiant.model";




export const creeEtudiant = async (req: Request, res: Response) => {
    const etudiant = req.body;

    try {
        const etudiantExiste = 
        await Etudiant
        .findOne({email: etudiant.email});
        if(etudiantExiste){
            res.status(400).json({
                message: 'Cet etudiant existe deja'
            });
        }else {
        etudiant.matricule = generateMatricule('ETU');
        const hashedPassword = await bcrypt.hash(etudiant.password, 10);
        etudiant.password = hashedPassword;
        const newEstudiant = new Etudiant(etudiant);
        await newEstudiant.save();
        const token = jwt.sign(
            {
                userId: newEstudiant._id,
                email: newEstudiant.email,
                matricule: newEstudiant.matricule,
            },
            "process.env.JWT_SECRET",
            { expiresIn: '30d' }
        );
        res.status(201).json({
            message: 'Etudiant cree avec succes',
            etudiant: {
                _id: newEstudiant._id,
                nom: newEstudiant.nom,
                prenom: newEstudiant.prenom,
                email: newEstudiant.email,
                dateNaissance: newEstudiant.dateNaissance,
                sexe: newEstudiant.sexe,
                niveau: newEstudiant.niveau,
                filiere: newEstudiant.filiere,
                matricule: newEstudiant.matricule,
                createdAt: newEstudiant.createdAt,
            },
            token: token
        });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Erreur serveur' + error
        });
    }
}

export const loginEtudiant = async (req: Request, res: Response) => {
    const estudiantData = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        const etudiant: EtudiantDocument = 
        await Etudiant.findOne({email: estudiantData.email});
        if(!etudiant){
            res.status(404).json({
                message: 'Etudiant non trouve'
            });
        }else {
            const isPasswordValid = await bcrypt.compare(estudiantData.password, etudiant.password);
            if(isPasswordValid){
                const token = jwt.sign(
                    {
                        userId: etudiant._id,
                        email: etudiant.email,
                        matricule: etudiant.matricule,
                    },
                    'process.env.JWT_SECRET',
                    { expiresIn: '30d' }
                )
                res.status(200).json({
                    message: 'Etudiant connecte avec succes',
                    etudiant: etudiant,
                    token: token
                });
            }else {
                res.status(401).json({
                    message: 'Mot de passe incorrect'
                });
            }
        }

    } catch (error) {
        res.status(500).json({
            message: 'Erreur serveur' + error
        });
    }
}

export const getEtudiants = (req: Request, res: Response) => {
    
    Etudiant.find()
    .then(
        (etudiants: EtudiantDocument[]) => {
            res.status(201).json({
                message: 'Etudiants trouves avec succes',
                etudiants: etudiants
            })
        }
    ).catch(error => {
        res.status(500).json({
            message: 'Erreur serveur' + error
        })
    })
}

export const getEtudiantByMatricule = (req: Request, res: Response) => {
    const matricule = generateMatricule('ETU');

    res.status(200).json({
        message: 'Etudiant trouve avec succes',
        matricule: matricule,
        date: Date.now().toString().length
    })
}



export function generateMatricule(mat: string) {
    const date = new Date();
    const matricule = Math
    .floor(Math.random() * 
    (date.getTime()) + 
    (date.getTime()));
    const etudiantMatricule = mat + matricule.toString().slice(0, 8);
    return etudiantMatricule;
}