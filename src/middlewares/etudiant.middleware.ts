import {Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkAuthEtudiant = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(
            'token',
            req.headers.authorization
        )
    const token: string = (req.headers.authorization as string);
    const userData = jwt.verify(
        token,
        'etudiant1234'
    );
    (req as any).userData = userData;
    next();
    } catch (error) {
        res.status(500).json({
            message: 'Authentification requis'
        })
        throw new Error(error)
    }
}