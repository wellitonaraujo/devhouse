// metodos: index, show, update, store, destroy

/*
index -listagem de sessões
show - Lista uma unica uma sessão
update - Alterar alguma sessão
store - Criar uma sessão
destroy - Deleter uma sessão
*/ 
import * as Yup from 'yup';
import User from '../models/User';

class SessionControler{

    async store(req, res) {
        // Validação
        const schema = Yup.object().shape({
            email: Yup.string().email().require(),
        });

        const { email } = req.body;

        // Verificando se o/os usuário/s ja existe
       let user = await User.findOne({ email });

       if(!(await schema.isValid(req.body))){
           return res.status(400).json({ error: "Falha na validação." });
       }
       
       if(!user) {
          user = await User.create({ email })
       }

        return res.json(user);
    }

}

export default new SessionControler();