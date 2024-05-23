import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayloadInterface } from "../interfaces/jwtPayload.interface";

const privateKey = process.env.PRIVATE_KEY || "t6ODR4eTZ5zAPk7gwM9W2MZ1euf5HhJi";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No se obtuvo el token.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'El formato del token es invalido' });
    }

    try {
        const decoded = jwt.verify(token, privateKey) as JwtPayloadInterface;

        if (typeof decoded !== 'object' || !decoded.userId || !decoded.email) {
            throw new Error('El token no es válido');
        }

        req.body.userId = decoded.userId;
        req.body.email = decoded.email;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'El token no es válido o ha expirado' });
    }
};
