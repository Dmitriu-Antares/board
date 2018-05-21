import { Boards } from '../models/Boards';
import { Users } from '../models/Users';
import { UserBoards } from '../models/UserBoards';
import express from 'express';

const router = express.Router();

router.post('/create', (req,res) => {
    // add bearer проверку на юзера, чтобы нельзя было создавать изнепойми откуда.
    const { user, name } = req.body;
    Boards.forge({name,adminID:user},{hasTimestamps:true}).save()
        .then( table => {
            const boardId = table.attributes.id;
            UserBoards.forge({userId:user, boardId},{hasTimestamps:true}).save().then( userBords => {
                res.status(200).json({success:true});
            }).catch( err => {
                res.status(500).json({success:false});
            })
        })
        .catch( err => {
            res.status(500).json({success:false});
        })
});

router.get('/get_boards', (req,res) => {
    const { userID } = req.query;
    UserBoards.query().where('userId',userID).select()
        .then(boards => {
            Boards.query().select().then( boardsList => {
                let list = [];
                boards.map( board => {
                    console.log(board.boardId);
                    list = [...list, boardsList.filter( b => b.id == board.boardId)[0]];
                });
                res.status(200).json({boards:list});
            }).catch(err => {
                res.status(500).json({err});
            })
        }).catch(err => {
            res.status(500).json({err});
        })
});



router.get('/get_users', (req,res) => {
    const { currentId, boardId } = req.query;
    // переписать этот код так чтобы проверялся на только юзер админ, но и все юзеры с доступом

    UserBoards.query().select().then(boards => {
        Users.query().select().then(users => {
            let usersList = [];
            boards.map(boardUser => {
                console.log(boardUser);
                if(boardUser.boardId == boardId) {

                    usersList = [...usersList, users.filter(u => (u.id != boardUser.userId && u.id != currentId))]
                }
            });
            res.status(200).json({users:usersList[usersList.length - 1]});
        }).catch(err => res.status(500).json({success:false}));
    }).catch(err => res.status(500).json({success:false}));

});

router.post('/add_users', (req,res) => {
   const { userId, boardId } = req.body;
   UserBoards.forge({userId, boardId},{hasTimestamps:true}).save().then( r => {
       res.status(200).json({success:true});
   }).catch(err => res.status(500).json({success:false}));
});

export default router;