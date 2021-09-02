// metodos: index, show, update, store, destroy

/*
index -listagem de sessões
show - Criar uma sessão
update - Quando  queremos alterar alguma sessão
store - Criar uma sessão
destroy - Quanso queremos deleter uma sessão
*/ 
import User from '../models/User';

class SessionControler{
    async store(req, res) {
        const { email } = req.body;

        // Verificando se o/os usuário/s ja existe
       let user = await User.findOne({ email });
       
       if(!user) {
          user = await User.create({ email })
       }

        return res.json(user);
    }

}

export default new SessionControler();