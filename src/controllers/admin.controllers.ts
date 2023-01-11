import bcryp from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Admin from '../models/admin.model';

export const creeAdmin = async (req: Request, res: Response) => {
    const adminData = (req as any).body;

    try {
        const hash = await bcryp.hash(adminData.password, 10);
        adminData.password = hash;
        const admin = new Admin(adminData);
        await admin.save();
        res.status(201).json({
            message: 'Admin cree avec succes',
            admin: admin
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erreur serveur' + error
        })
    }
}

export const loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const admin = await
        Admin.findOne({ email});
        if (!admin) {
            return res.status(400).json({
                message: 'Cet admin n\'existe pas'
            })
        }
        const isPasswordValid = await bcryp.compare(password, admin.password);

        if (!isPasswordValid) {
            res.status(400).json({
                message: 'Mot de passe incorrect'
            })
        }
        const token = jwt.sign(
            {
                email: admin.email,
                userId: admin._id
            },
            'admin1234',
            {
                expiresIn: '60d'
            }
        )
        res.status(200).json({
            message: 'Admin connecte avec succes',
            admin: admin,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Error '+ error
        })
    }
}
