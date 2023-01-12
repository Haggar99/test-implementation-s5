import { Request, Response } from "express"
import { constants } from "fs";
import Cours from "../models/cours.model";


export const creeCours = async (req: Request, res: Response) => {
    const coursData = req.body;
    console.log(coursData);
    try {
        const cours = await Cours.findOne({code: coursData.code});
        if(cours){
            res.json({message:'le cours existe'})
        }
        const newCours = new Cours(coursData);
        newCours.save();
        res.json({newCours});
    } catch (error) {
        res.status(500).json({
            message: 'Error '+ error
        })
    }
}

export const affecteProf = async (req: Request,res:Response)=>{
    const code = req.params.code;
    const idenseignant = req.body.idEnseignant
    const cours =await Cours.findOne({code:code})
    if(cours){

        cours.enseignant = idenseignant;
        await cours.save() 
        res.json(cours)

    }
} 



export const affectEtudiant = async (req:Request, res:Response)=>{
    const code = req.params.code;
    const etudiants = req.body.etudiants;
    const cours = await Cours.findOne({code:code})
    if(cours){
        cours.etudiants.push(...etudiants);
        await cours.save()
        res.json(cours);
        

    }

}

export const getCours = (req: Request, res: Response) => {
    const code = req.params.code;

    Cours
    .findOne({code: code})
    .populate('etudiants')
    .populate('enseignant')
    .then((cours)=>{
        res.json({cours: cours})
    })
}

