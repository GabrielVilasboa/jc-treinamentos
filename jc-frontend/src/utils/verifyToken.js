import http from "./httpCommon"

async function verifyToken(){
    const token = localStorage.getItem('token')
    if(!token){
        return false
    }
    try{
        await http.get('/verify-token')
        return true
    }catch(e){
        return false
    }
}

export default verifyToken