import responseGeneral from '../helpers/response.helper.js';
import generalHelper from '../helpers/general.helper.js'; 
import sequelize from '../config/sequelize.js';
import { Op } from 'sequelize';

const { Dealing, Product, Detail_Dealing } = sequelize.models;

async function list(req, res, next) {
    try {
        const user =  req.user;
        const data = await Dealing.findAll({ where: { company_id : user.company_id }});

        return responseGeneral(res, 1, 200, data);
    } catch (e) {
        next(e);
    }
}

async function create(req, res, next) {
    try {
        const products = req.body.products;
        const user =  req.user;
        let provider_id = null;
        let detail = [];
        let total = 0;
        for (let product of products) {
            let validator = await generalHelper.findByAttributes({ id: product.product_id }, Product);
            if(!validator) {
                return responseGeneral(res, 0, 400, null, "Hay un producto que es incorrecto");
            }
            if(!validator.active) {
                return responseGeneral(res, 0, 400, null, "Hay un producto que esta inactivo");
            }
            if(validator.company_id == user.company_id) {
                return responseGeneral(res, 0, 400, null, "No puedes comprar tu mismo producto");
            }

            if(!provider_id){
                provider_id = validator.company_id;
            }
            else if(provider_id !== validator.company_id) {
                return responseGeneral(res, 0, 400, null, "Los productos deben ser del mismo proveedor");
            }

            let subtotal = (product.amount * validator.unit_price);
            total = total + subtotal;
            detail.push({
                product_id : product.product_id,
                unit_price : validator.unit_price,
                amount: product.amount,
                subtotal: subtotal
            });
        }

        const result = await sequelize.transaction(async(t) => {
            const dealing = await Dealing.create({
                user_id: user.sub,
                company_id: user.company_id,
                provider_id: provider_id,
                type_dealing_id: 1,
                total: total,
            },
                { transaction: t }
            );

            for (let d of detail) {
                let detail_dealing = await Detail_Dealing.create({
                    dealing_id : dealing.id,
                    product_id : d.product_id,
                    unit_price : d.unit_price,
                    amount: d.amount,
                    subtotal: d.subtotal
                },
                    { transaction: t }
                );
            }

            return dealing;
        });

        // TODO: Falto revisar que el total no deje en -0 al stock
        for (let d of detail) {

            let data = await Product.findOne({
                where : { id: d.product_id },
            });
            
            let stock = data.stock - d.amount;

            let product = await Product.update({ stock : stock },
                { where: { id: d.product_id } }
            );
        }

        return responseGeneral(res, 1, 200, result);
    } catch (e) {
        next(e);
    }
}

async function show(req, res, next){
    try {
        const { id } = req.params;
        const user =  req.user;

        const dealing = await Dealing.findOne({ 
            where: {
                [Op.and]: [
                    { company_id : user.company_id },
                    { id : id }
                ]
            },
            include: [ 
                {
                    model: Detail_Dealing,
                    as: 'detail_dealing',
                    include: [
                        {
                            model: Product,
                            as: 'product'
                        } 
                    ]
                },
                
            ],
        });

        if(dealing) {
            return responseGeneral(res, 1, 200, dealing);
        }
        return responseGeneral(res, 0, 404);

    } catch (e) {
        next(e);
    }
}

async function update(req, res, next) {
    try {
        const id = req.params.id;
        const products = req.body.products;
        const user =  req.user;
        let provider_id = null;
        let detail = [];
        let total = 0;
        const validator = await generalHelper.findByAttributes({
            [Op.and]: [
                { company_id : user.company_id },
                { id : id }
            ]
        }, Dealing);

        if(!validator) {
            return responseGeneral(res, 0, 404);
        }

        for (let product of products) {
            let validator = await generalHelper.findByAttributes({ id: product.product_id }, Product);
            if(!validator) {
                return responseGeneral(res, 0, 400, null, "Hay un producto que es incorrecto");
            }
            if(!validator.active) {
                return responseGeneral(res, 0, 400, null, "Hay un producto que esta inactivo");
            }
            if(validator.company_id == user.company_id) {
                return responseGeneral(res, 0, 400, null, "No puedes comprar tu mismo producto");
            }

            if(!provider_id){
                provider_id = validator.company_id;
            }
            else if(provider_id !== validator.company_id) {
                return responseGeneral(res, 0, 400, null, "Los productos deben ser del mismo proveedor");
            }

            let subtotal = (product.amount * validator.unit_price);
            total = total + subtotal;
            detail.push({
                product_id : product.product_id,
                unit_price : validator.unit_price,
                amount: product.amount,
                subtotal: subtotal
            });
        }

        let detail_dealing = await Detail_Dealing.findAll({
            where: { dealing_id : id }
        });

        for (let d of detail_dealing) {

            let data = await Product.findOne({
                where : { id: d.product_id },
            });
            
            let stock = data.stock + d.amount;

            let product = await Product.update({ stock : stock },
                { where: { id: d.product_id } }
            );
        }

        await Detail_Dealing.destroy({
            where: { dealing_id : id }
        });

        const result = await sequelize.transaction(async(t) => {
            const dealing = await Dealing.update({
                user_id: user.sub,
                company_id: user.company_id,
                provider_id: provider_id,
                type_dealing_id: 1,
                total: total,
            },
                { where: { id: id } },
                { transaction: t }
            );

           for (let d of detail) {
                let detail_dealing = await Detail_Dealing.create({
                    dealing_id : id,
                    product_id : d.product_id,
                    unit_price : d.unit_price,
                    amount: d.amount,
                    subtotal: d.subtotal
                },
                    { transaction: t }
                );
            }

            return dealing;
        });

        // TODO: Falto revisar que el total no deje en menos de 0 al stock
        for (let d of detail) {

            let data = await Product.findOne({
                where : { id: d.product_id },
            });
            
            let stock = data.stock - d.amount;

            let product = await Product.update({ stock : stock },
                { where: { id: d.product_id } }
            );
        }

        return responseGeneral(res, 1, 200);
    } catch (e) {
        next(e);
    }
}

async function remove(req, res, next){
    try {
        const user = req.user; 
        const { id } = req.params;
        const validator = await generalHelper.findByAttributes({
            [Op.and]: [
                { company_id : user.company_id },
                { id : id }
            ]
        }, Dealing);
        
        if(validator) {

            let detail = await Detail_Dealing.findAll({
                where: { dealing_id : id }
            });

            for (let d of detail) {

                let data = await Product.findOne({
                    where : { id: d.product_id },
                });
                
                let stock = data.stock + d.amount;
    
                let product = await Product.update({ stock : stock },
                    { where: { id: d.product_id } }
                );
            }

            await Detail_Dealing.destroy({
                where: { dealing_id : id }
            });

            await Dealing.destroy({
                where: { id }
            });
            return responseGeneral(res, 1, 200, null, "Eliminación realizada correctamente");
        }
        return responseGeneral(res, 0, 404);

    } catch (e) {
        next(e);
    }
}

export default {
    list,
    create,
    show,
    update,
    remove
}