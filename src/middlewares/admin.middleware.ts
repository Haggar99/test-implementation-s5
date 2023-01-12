import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";




export const checkAuthAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    const adminData = jwt.verify(
        token,
        'admin1234'
    );

    (req as any).adminData = adminData;
    next()
}