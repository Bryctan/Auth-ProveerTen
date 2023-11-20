
import connection from '../config/configdb';
import Provider from '../models/provider.model';
import comparePassword from './comparePasswordService';

export const registerProvider = (data: Provider): Promise<{ success: boolean, message: string }> => {
    const procInsertProviderQuery = 'call insertProvider (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @message_text)';
    return new Promise((resolve, reject) => {
        connection.query(procInsertProviderQuery, [data.nit_provider, data.email_provider, data.name_provider, data.last_name_provider, data.name_company, data.city_provider, data.password_provider, data.description_provider, data.neighborhood,
            data.street, data.number_street, data.number_provider], (error:any, results:any) => {
                if (error) {
                    reject(error);
                } else {
                    const message = results[0][0].message_text;
                    const success = message.includes('successfully');
                    resolve({ success, message });
                }
            });
    });
};

export const loginProvider = (data: Provider): Promise<boolean> => {

    const getProviderQuery = 'select email_provider,password_provider from Provider WHERE email_provider = ?';
    
    return new Promise<boolean>((resolve, reject) => {
        connection.query(getProviderQuery, [data.email_provider, data.password_provider], (error:any,results:any) => {
            if (error) {
                reject(error);
            } 
            let claveAlmacenada: string = results[0].password_provider;
            resolve(comparePassword(data.password_provider,claveAlmacenada));
    })
});
};