const {Router} = require('express');
const router = Router();
const Todo = require('../models/todo');

router.get('/', async (req, res) => {
   try {
      const todos = await Todo.findAll();
      res.status(200).json(todos);
   } catch (e) {
      console.log(e);
      res.status(500).json({
         message: 'Server error'
      });
   }
});

router.post('/', async (req, res) => {
   try {
      const todo = await Todo.create({
         title: req.body.title,
         done: false
      });
      res.status(201).json({todo});

   } catch (e) {
      console.log(e);
      res.status(500).json({
         message: 'Server error'
      });
   }
});

router.put('/:id', async (req, res) => {
   try {
      const todo = await Todo.findByPk(req.params.id);
      todo.done = req.body.done;
      await todo.save();
      res.status(200).json({todo});
   } catch (e) {
      console.log(e);
      res.status(500).json({
         message: 'Server error'
      });
   }
});

router.delete('/:id', async (req, res) => {
   try {
      const todo = await Todo.findAll({
         where: {id: +req.params.id}
      });
      await todo[0].destroy()
      res.status(204).json()
   } catch (e) {
      console.log(e);
      res.status(500).json({
         message: 'Server error'
      });
   }
});

module.exports = router;