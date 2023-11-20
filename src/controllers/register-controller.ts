import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import generateToken from '../helpers/generator-tokens';
import Provider from '../models/provider.model';
import Grocer from '../models/grocer.model';
import { registerGrocer } from '../service/GrocerService';
import { registerProvider } from '../service/ProviderService';

export const provider = async (req: Request, res: Response) => {
    try {
        const {
            nit_provider,
            email_provider,
            name_provider,
            last_name_provider,
            name_company,
            city_provider,
            password_provider,
            description_provider,
            neighborhood,
            street,
            number_street,
            number_provider
        } = req.body;

        const password_hash = await bcrypt.hash(password_provider, 10);

        const data: Provider = {
            nit_provider,
            email_provider,
            name_provider,
            last_name_provider,
            name_company,
            city_provider,
            password_provider: password_hash,
            description_provider,
            neighborhood,
            street,
            number_street,
            number_provider
        };

        const response = await registerProvider(data);

        if (response.success) {
            const secret_key: any = process.env.SIGNING_KEY_TOKEN;
            const token: any = generateToken(
                { role: "provider", email: data.email_provider },
                secret_key, new Date().getTime() + (2 * 60 * 1000)
            );

            res.status(200).json({ "Status": "Registrado con éxito", "token": token });
        } else {
            if (response.message.includes('error')) {
                res.status(400).json({
                    error: response.message
                });
            } else {
                res.status(500).json({
                    error: `duplicate provider registration error`,
                    message: response.message
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error,
            message: `error registering provider`
        });
    }
};

export const grocer = async (req: Request, res: Response) => {
    try {
        const {
            email_grocer,
            name_grocer,
            last_name_grocer,
            name_store,
            city_grocer,
            password_grocer,
            neighborhood,
            street,
            number_street,
            number_grocer
        } = req.body;

        const password_hash = await bcrypt.hash(password_grocer, 10);

        const data: Grocer = {
            email_grocer,
            name_grocer,
            last_name_grocer,
            name_store,
            city_grocer,
            password_grocer: password_hash,
            neighborhood,
            street,
            number_street,
            number_grocer
        };

        const response = await registerGrocer(data);

        if (response.success) {
            const secret_key: any = process.env.SIGNING_KEY_TOKEN;
            const token: any = generateToken(
                { role: "grocer", email: data.email_grocer },
                secret_key, new Date().getTime() + (2 * 60 * 1000)
            );
            res.status(200).json({ "Status": "Registrado con éxito", "token": token });
        } else if (response.message.includes('error')) {
                res.status(400).json({
                    error: response.message
                });
            } else {
                res.status(500).json({
                    error: `duplicate grocer registration error`,
                    message: response.message
                });
            }
        }
        catch (error) {
        console.error(error);
        res.status(500).json({
            error: error,
            message: `error registering grocer`
        });
    }
}