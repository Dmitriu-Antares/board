import { Users } from '../models/Users';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', (req,res) => {
    const { username, password } = req.body;
    return Users.query({
        where: { username:username },
        orWhere: { email:username }
    }).fetch().then(user => {
        if(user){
            bcrypt.compare(password,user.attributes.password, function(err, resp) {
                if(resp){
                    const cert = 'helloWorld';
                    const token = jwt.sign({
                        username: username,
                        id: user.get('id')
                    }, cert);
                    res.json({token});
                } else {
                    res.status(401).json({ errors: {form:'invalid creditionals'} });
                }
            });
        } else {
            res.status(401).json({errors: {form:'invalid creditionals'}});
        }
    })
});

export default router;