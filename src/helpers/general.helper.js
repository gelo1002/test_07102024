import  config  from '../config/config.js';
import jwt from 'jsonwebtoken';
import sequelize from '../config/sequelize.js';

const { User, Role, Company } = sequelize.models;

async function findUserByEmail(email) {
    let user = await User.findOne({
        where : { email: email },
        include: [ 
            {
                model: Role,
                as: 'role',
                attributes: ['name','key']
            },
            {
                model: Company,
                as: 'company',
                attributes: ['name']
            } 
        ],
    });

    return user;
}

async function findByAttributes(where, model) {
    let data = await model.findOne({
        where : where,
    });

    return data;
}

async function generateTokenJWT(user) {
    const payload = {
        sub: user.id,
        name: user.name,
        role: user.role.key,
        company: user.company ? user.company.name : null
    }
    const token = jwt.sign(payload, config.jwt_secret);
    return token;
} 

export default {
    findUserByEmail,
    findByAttributes,
    generateTokenJWT
}