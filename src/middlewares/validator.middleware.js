import responseGeneral from "../helpers/response.helper.js";

// property = body, params, query
function attributeValidator(schema, property, attribute=null) {
    return (req, res, next) => {
        const data = attribute ? req[property][attribute] : req[property];
        const { error } = schema.validate(data, { abortEarly: false, convert:false });
        if (error) {
            return responseGeneral(res, 0, 400, error.message);
        }
        next();
    }
}

export default attributeValidator;