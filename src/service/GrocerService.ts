import connection from '../config/configdb';
import Grocer from '../models/grocer.model';
import comparePassword from './comparePasswordService';

export const registerGrocer = (data: Grocer): Promise<{ success: boolean, message: string }> => {
    const procInsertGrocerQuery = 'call insertGrocer (?,?,?,?,?,?,?,?,?,?,@message_text);';
    return new Promise((resolve, reject) => {
        connection.query(procInsertGrocerQuery, [
            data.email_grocer, data.name_grocer, data.last_name_grocer, data.name_store,data.city_grocer,data.password_grocer,
        data.number_grocer, data.neighborhood, data.street, data.number_street], (error:any, results:any) => {
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


export const loginGrocer = (data: Grocer): Promise<boolean> => {

    const getGrocerQuery = 'SELECT email_grocer,password_grocer FROM Grocer WHERE email_grocer = ?';
    
    return new Promise<boolean>((resolve, reject) => {
        connection.query(getGrocerQuery, [data.email_grocer, data.password_grocer], (error,results:any) => {
            if (error) {
                reject(error);
            } 
            let claveAlmacenada: string = results[0].password_grocer;
            resolve(comparePassword(data.password_grocer,claveAlmacenada));
    })
});
};
