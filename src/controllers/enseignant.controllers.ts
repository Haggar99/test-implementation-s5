import Enseignant, { EnseignantDocument } from "../models/enseignant.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { generateMatricule } from "./etudiant.controllers";



export const creeEnseignant = async (req: Request, res: Response) => {
    const enseignantData = req.body;
    const email = enseignantData.email;
    try {
        const enseignant = await Enseignant.findOne({email});
        if (enseignant) {
            return res.status(400).json({
                message: 'Cet enseignant existe deja'
            })
        }else{
        const newEnseignant = new Enseignant(enseignantData);
        const hashedPassword = await bcrypt.hash(enseignantData.password, 10);
        newEnseignant.matricule = generateMatricule('ENS');
        newEnseignant.password = hashedPassword;
        await newEnseignant.save();
        const token = jwt.sign(
            {
                userId: newEnseignant._id,
                email: newEnseignant.email,
                matricule: newEnseignant.matricule,
            },
            "process.env.JWT_SECRET",
            { expiresIn: '30d' }
        );
        res.status(201).json({
            message: 'Enseignant cree avec succes',
            enseignant: newEnseignant,
            token: token
        });
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'Erreur serveur' + error
        })
    }
}


export const loginEnseignant = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const enseignant: EnseignantDocument = 
        await Enseignant.findOne({ email });
        if (!enseignant) {
            return res.status(400).json({
                message: 'Cet enseignant n\'existe pas'
            })
        }
        const isPasswordValid = await bcrypt.compare(password, enseignant.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: 'Mot de passe incorrect'
            })
        }
        const token = jwt.sign(
            {
                email: enseignant.email,
                userId: enseignant._id,
                matricule: enseignant.matricule
            },
            'enseigant1234',
            {
                expiresIn: '30d'
            }
        );
        res.status(200).json({
            message: 'Connecté',
            token
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Erreur serveur' + error
        })
    }
}

