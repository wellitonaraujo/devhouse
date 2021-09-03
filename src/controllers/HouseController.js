import House from '../models/House';
import * as Yup from 'yup';
import User from '../models/User';

class HouseController{

    async index(req, res) {
        const { status } = req.query;

        const houses = await House.find({ status: status});
        return res.json(houses);
    }

    async store(req, res){
        // Validações
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            prince: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required()
        });
        
        const { filename } = req.file;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Falha na validação" })
        }

        const house = await House.create({
            user_id: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });

        return res.json(house);
    }

    async update(req, res) {
        // Validações
        const schema = Yup.object().shape({
        description: Yup.string().required(),
        prince: Yup.number().required(),
        location: Yup.string().required(),
        status: Yup.boolean().required()
    });

        const { filename } = req.file;
        const { house_id } = req.params;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Valha na validação" })
        }



        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        if(String(user._id) !== String(house_id)){
            return res.status(401).json({ error: "Não autorizado" })
        }

        await House.updateOne({ _id: house_id }, {
            user_id: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });

        return res.send();

    }

    async destroy(req, res) {
        const { house_id } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        if(String(user._id) !== String(house_id)){
            return res.status(401).json({ error: "Não autorizado" })
        }

        await House.findByIdAndDelete({_id: house_id});

        return res.json({message: "Casa excluida com sucesso"})
    }
}

export default new HouseController();