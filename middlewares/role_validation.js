exports.IsAdmin = async (request, response, next) => {
    if (request.user.role == "admin") {
        next();
    }
    else {
        return response.status(401).json({
            success: false,
            auth: false,
            message: `Forbidden! You are Not Admin`
        })
    }
}    

exports.IsManager = async (request, response, next) => {
    console.log(request.user.role)
    if (request.user.role == "manager") {
        next();
    }
    else {
        return response.status(401).json({
            success: false,
            auth: false,
            message: `Forbidden! You are Not User`
        })
    }
}

exports.IsKasir = async (request, response, next) => {
    console.log(request.user.role)
    if (request.user.role == "kasir") {
        next();
    }
    else {
        return response.status(401).json({
            success: false,
            auth: false,
            message: `Forbidden! You are Not Kasir`
        })
    }
}