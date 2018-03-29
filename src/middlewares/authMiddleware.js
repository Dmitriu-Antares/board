import jwt from 'jsonwebtoken';
import Users from '../models/Users';

export default function authMiddleware(router){
    router.use((req, res, next) => {
        const bearer = req.rawHeaders.find( el => { if(el.includes('Bearer')){return el} else {return false}});
        const user = jwt.decode(bearer.slice(7));
        if(user) {
            req.id = user.id;
            req.username = user.username;
            next();
        } else console.error('there is no such user');
    })
}