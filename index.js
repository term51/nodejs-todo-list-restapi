const express = require('express');
const sequelize = require('./utils/database');
const path = require('path');
const app = express();

const todoRoutes = require('./routes/todo');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api/todo', todoRoutes);

app.use((req, res, next) => {
   res.sendFile('/index.html');
});

const PORT = process.env.PORT || 3000;

async function start() {
   try {
      await sequelize.sync();
      app.listen(PORT, () => {
         console.log(`Express started on http://localhost:${PORT}/`);
      });

   } catch (e) {
      console.log(e);
   }
}

start();


