import { Request, Response } from "express";

// Ici on a importer le module bcrypt qui nous permet de crypter les mots de passe
import bcrypt  from "bcrypt";

// Ici on a importer json web token (jwt) qui nous permet de creer et
// verifier les tokens 
import jwt from "jsonwebtoken";

// on a importer le schema de donnees Etudiant depuis le model etudiant.model
import Etudiant, { EtudiantDocument } from "../models/etudiant.model";

import { Status } from "../models/enseignant.model";



export const creeEtudiant = async (req: Request, res: Response) => {
    // on recupere les donnees de l'etudiant depuis le corps de la requete
    const etudiant = req.body;

    try {
        // on verifie si l'etudiant existe deja dans la base de donnees
        // en verifiant son email avec fonction findOne de mongoose
        // cette fonction prend en argument un objet qui contient les conditions
        // cette fonction findOne retourne un objet de type EtudiantDocument

        const etudiantExiste = 
        await Etudiant
        .findOne({email: etudiant.email});
        if(etudiantExiste){

            res.status(400).json({
                message: 'Cet etudiant existe deja'
            });
        }else {
            // si l'etudiant n'existe pas on le cree
            // on genere son matricule avec la fonction generateMatricule qu'on a cree
        etudiant.matricule = generateMatricule('ETU');
        // on crypte le mot de passe de l'etudiant avec la fonction hash de bcrypt
        const hashedPassword = await bcrypt.hash(etudiant.password, 10);
        // on remplace le mot de passe en clair par le mot de passe crypte
        etudiant.password = hashedPassword;
        // on cree un nouvel objet de type EtudiantDocument

        const newEstudiant = new Etudiant(etudiant);
        // on sauvegarde l'etudiant dans la base de donnees
        // en utilisant la fonction save() de mongoose
        // Sinon on peut utiliser la fonction create() de mongoose
        await newEstudiant.save()
        // on genere un token pour l'etudiant
        // on utilise la fonction sign de jsonwebtoken
        // cette fonction prend en argument un objet qui contient les donnees
        // de l'etudiant qu'on veut stocker dans le token

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
            // on compare le mot de passe de l'etudiant avec le mot de passe
            // crypte dans la base de donnees avec la fonction compare de bcrypt
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

export const getEtudiants = async (req: Request, res: Response) => {

    try {
        // La fonction find() retourne un tableau d'objets
        // on peut mettre des conditions dans la fonction find()
        // par exemple: Etudiant.find({nom: 'Moussa'})
        const estudiants: EtudiantDocument[] = await Etudiant.find();

        // La fonction countDocuments() retourne le nombre total d'objets
        // par exemple: Etudiant.countDocuments()
        // il nous retourne le nombre total d'etudiants
        const tolal = Etudiant.countDocuments();
        res.status(200).json({
            message: 'La liste de tous les etudiants',
            estudiants: estudiants,
            total: tolal
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Erreur serveur' + error
        })
    }
    
    // Etudiant.find()
    // .then(
    //     (etudiants: EtudiantDocument[]) => {
    //         res.status(201).json({
    //             message: 'Etudiants trouves avec succes',
    //             etudiants: etudiants
    //         })
    //     }
    // ).catch(error => {
    //     res.status(500).json({
    //         message: 'Erreur serveur' + error
    //     })
    // })
}

export const getEtudiantByMatricule = async (req: Request, res: Response) => {
    // l'attribut params de Request nous permet de pointer vers 
    // les parametres de l'url envoyer par l'utilisateur
    const matricule = req.params.matricule;
    try {
        const etudiant: EtudiantDocument = 
        await Etudiant
        .findOne({matricule: matricule});

        if(etudiant){
            res.status(201).json({
                message: 'Etudiant trouve avec succes',
                etudiant: etudiant
            })
        }else {
            res.status(404).json({
                message: 'Etudiant non trouve'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Erreur serveur' + error
        })
    }
}

export const changeStatusEtudiant = async (req: Request, res: Response) => {
    const matricule = req.params.matricule;
    const status = req.body.status;
    try {
        // Etudiant.findOneAndUpdate(
        //     {matricule: matricule},
        //     {status: status? status: Status.Actif},
        // )
        const etudiant: EtudiantDocument = 
        await Etudiant
        .findOne({matricule: matricule});
        if(etudiant){
            etudiant.status = status? status: Status.Actif;
            etudiant.save();
        }else {
            res.status(404).json({
                message: 'Etudiant non trouvé!'
            });
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'Erreur serveur' + error
        })
    }
}


export const updatePasswordEtudiant = async (req: Request, res: Response) => {
    // const userId = req.userData.userId;
    const userId = req.params.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try {
        // la fonction findById retourne un objet a travers son id
        const etudiant: EtudiantDocument = 
        await Etudiant.findById(userId);
        const isPasswordValid = await bcrypt.compare(oldPassword, etudiant.password);

        if(isPasswordValid){
        // on crypte le mot de passe de l'etudiant avec la fonction hash de bcrypt
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        }
        
    } catch (error) {
        res.status(500).json({
            message: 'Erreur serveur' + error
        })
    }
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