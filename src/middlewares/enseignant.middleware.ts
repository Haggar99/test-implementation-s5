import { NextFunction, Response, Request } from "express";
import jwt from 'jsonwebtoken'
export const checkAuthEnseignant = (req: Request, res: Response, next: NextFunction) => {

   try {
    const token: string = req.headers.authorization

    const userData = jwt.verify(
        token,
        'enseigant1234');

    (req as any).userData = userData;
    next();
   } catch (error) {
    res.status(500).json({
        message: "errreur" + error
    })
   }

}