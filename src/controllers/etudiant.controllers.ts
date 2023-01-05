import { Request, Response } from "express";
import Etudiant, { EtudiantDocument } from "../models/etudiant.model";




export const creeEtudiant = async (req: Request, res: Response) => {
    const etudiant = req.body;

    try {
        const newEstudiant = new Etudiant(etudiant);
        await newEstudiant.save();
        res.status(201).json({
            message: 'Etudiant cree avec succes',
            etudiant: newEstudiant
        });
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
            if(etudiant.password === estudiantData.password){
                res.status(200).json({
                    message: 'Etudiant connecte avec succes',
                    etudiant: etudiant
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
