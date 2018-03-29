import { Boards } from '../models/Boards';
import express from 'express';

const router = express.Router();

router.post('/create', (req,res) => {
    // add bearer проверку на юзера, чтобы нельзя было создавать изнепойми откуда.
    const { user, name } = req.body;
    Boards.forge({name,adminID:user},{hasTimestamps:true}).save()
        .then( table => {
            res.status(200).json({
                success:true
            });
        })
        .catch( err => {
            res.status(500).json({success:false});
        })
});

router.get('/get_boards', (req,res) => {
    const { userID } = req.query;
    Boards.where('adminID',userID).fetchAll()
        .then(boards => {
            res.status(200).json({boards});
        }).catch(err => {
            res.status(500).json({err});
        })
});

export default router;