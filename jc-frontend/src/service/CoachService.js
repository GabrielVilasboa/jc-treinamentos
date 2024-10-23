import Coach from '../models/Coach'
import http from '../utils/http-common'

class CoachService {
 constructor(id){
        this.id = id 
        this.name = null
        this.email = null
    }

    async populateCoach(){
        try{
            const url = `coach/${this.id}`
            const response = await http.get(url)
            const data = response.data

            console.log(data)
            
            if(!data){
                console.error("coach não existente")
                return
            }
            const coach = new Coach(response.data.name, data.email)
            console.log(coach)
            return coach
        }catch(e){
            console.error('Não foi possivel realizar a função populate coach \n' + 'error: ' + e.message)
        }
        
    }
}

export default CoachService

