export default class Coach{
    constructor(id, name, login, password){
        //TODO
    }
}

/* 
* O Password não será usado aqui pois terei que fazer um sistema de authentificação baseado no backend por segurança,
* então posso pensar em colocar algo como uma sessão do Coach aqui. ou algo do tipo para indentificacar que ele está
* logado e usando o sistema. Devemos pesquisar como isso é feito e como podemos implementar, no momento consigo pensar
* que utiliza um server websocket para a comunicação em tempo real e menor chance de falhas de segurança mas isso pode 
* estar errado. deve ser feita uma pesquisa aprofundada sobre essa parte.
*/