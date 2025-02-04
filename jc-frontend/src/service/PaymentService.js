import http from "@/utils/httpCommon";
import BaseService from "./BaseService";

class PaymentService extends BaseService{
    constructor(){
        super("payments")
    }

    async confirmPayment(id){
        try{
            const response = await http.put(`/payments/status-to-true/${id}`)
            return response.data
        }catch(error){
            console.log("Erro ao confirmar pagamento" + error.message)
        }
    }

    async findAll(params = {}){
        try{
            const response = await http.get(`/payments/`, {params})
            console.log(response.data)
            return response.data
        }catch(error){
            console.log("Erro ao buscar pagamentos" + error.message)
        }
    }
}

export default new PaymentService()