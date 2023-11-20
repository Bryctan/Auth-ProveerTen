import { Request, Response } from 'express';
import { loginProvider } from '../service/ProviderService';
import { loginGrocer } from '../service/GrocerService';
import generateToken from '../helpers/generator-tokens';

export const provider = async (req: Request, res: Response) => {

    try {
        let { email_provider, password_provider } = req.body;

        if (!password_provider) {
            return res.status(400).json({ Status: 'La contraseña es obligatoria' });
        }
        const data: any = {
            email_provider,
            password_provider
        };

        let response = await loginProvider(data)

        if (response) {
            let secret_key: any = process.env.SIGNING_KEY_TOKEN;
            let token: any = generateToken(
                { role: "provider", email: email_provider },
                secret_key, new Date().getTime() + (2 * 60 * 1000)
            )
            return res.status(200).json({ status: 'Successful authentication', token: token });
        } else {
            return res.status(401).json({ Status: 'Credenciales incorrectas' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: `Error al registrar proveedor`
        });
    }

};


export const grocer = async (req: Request, res: Response) => {
    try {
        let { email_grocer, password_grocer } = req.body;

        if (!password_grocer) {
            return res.status(400).json({ Status: 'La contraseña es obligatoria' });
        }

        const data: any = {
            email_grocer,
            password_grocer
        };

        let response = await loginGrocer(data)

        if (response) {
            let secret_key: any = process.env.SIGNING_KEY_TOKEN;
            let token: any = generateToken(
                { role: "grocer", email: email_grocer },
                secret_key, new Date().getTime() + (2 * 60 * 1000)
            )
            return res.status(200).json({ status: 'Successful authentication', token: token });
        } else {
            return res.status(401).json({ Status: 'Credenciales incorrectas' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: `Error al registrar tendero`
        });
    }
};
