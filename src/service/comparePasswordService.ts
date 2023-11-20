import bcrypt from 'bcrypt';

function comparePassword (password:string,claveAlmacenada: string):boolean {

    if (bcrypt.compareSync(password, claveAlmacenada)) {
        return true;
    } else {
        return false;
    }
}

export default comparePassword;

