function responseGeneral (res, success=1, status=200, data=null, message=null, error=null) {
    let default_messages = [];
    let msg = message;
    default_messages[200] = 'Solicitud realizada correctamente';
    default_messages[201] = 'Elemento creado con éxito';
    default_messages[400] = 'Solicitud inválida, datos faltantes o incorrectos';
    default_messages[401] = 'No autorizado';
    default_messages[403] = 'Prohibido';
    default_messages[404] = 'Elemento no encontrado';
    default_messages[500] = 'Error del servidor al procesar la solicitud';
    if (!msg) {
        msg = default_messages[status]; 
    }
    if (error) {
        console.error(error);
    }
    res.status(status).json({
        success : success,
        data : data,
        message : msg,
    });
}
export default responseGeneral;