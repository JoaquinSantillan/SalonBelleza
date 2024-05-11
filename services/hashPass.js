const bcrypt = require('bcrypt')


async function hashPassword(password)
{
    const salts = 10;
    const hashedPass = await bcrypt.hash(password,salts);
    return hashedPass;
}


module.exports = hashPassword;