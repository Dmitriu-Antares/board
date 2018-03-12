import express from 'express';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import { Users } from '../models/Users';
import cors from 'cors';

const router = express.Router();
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

function validateInput(data) {
    let errors = {};
    return Users.query({
        where: {email: data.email},
        orWhere: {username: data.username}
    }).fetch().then(user => {
        if(user){
            if (user.get('username') === data.username) {
                errors.username = 'This username is already in use';
            }
            if(user.get('email') === data.email) {
                errors.email = 'This email is already in use';
            }
            return {
                errors,
                isValid: isEmpty(errors)
            }
        } else return {errors, isValid: true}
    })
}

router.post('/',(req,res) => {
    const { email, fullname, username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);
    validateInput(req.body).then(({errors, isValid}) => {
        console.log(errors, isValid);
        if(isValid) {
            Users.forge({fullname,username,email,password:hashedPassword},{hasTimestamps:true}).save()
                .then(user => {
                    res.status(200).json({
                        success:true
                    });
                })
                .catch(err => {
                    res.status(500).json({error:err});
                });
        }
        else {
            res.status(400).json({error:errors})
        }
    });

});

export default router;