import Enseignant from "../models/enseignant.model";
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
        const newEnseignant = new Enseignant(enseignant);
        const hashedPassword = await bcrypt.hash(enseignant.password, 10);
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

