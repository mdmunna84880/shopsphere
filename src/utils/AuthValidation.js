export const isValidPassword = (password) =>{
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_])[A-Za-z\d@$!%*#?&^_]{6,}$/.test(password)
}

export const isValidUsername = (username) =>{
    return /^[a-z0-9_]{4,15}$/.test(username)
}

export const isValidEmail = (email)=>{
    return /^\S+@\S+\.\S+$/.test(email);
}