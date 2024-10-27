import express from 'express';
import {PrismaClient} from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient;
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors())

app.get('/',  async (req, res) => {
   const user = await prisma.user.findMany();
   res.status(200).json(user);
});

app.post('/', async (req, res) =>{
   await prisma.user.create({
      data: {
         email: req.body.email,
         name: req.body.name,
         age: req.body.age
      }
   });

   res.status(201).send("Usuário cadastrado com sucesso");
});

app.put('/:id', async (req, res) =>{
   await prisma.user.update({
      where:{
         id: req.params.id
      },
      data: {
         email: req.body.email,
         name: req.body.name,
         age: req.body.age
      }
   });

   res.status(201).send("Usuário alterado com sucesso");
});

app.delete('/:id', async (req, res) =>{
   await prisma.user.delete({
      where:{
         id: req.params.id
      }
   });
   res.status(200).send("Usuário deletado");
})
app.listen(port, () => {
   console.log("rodando"); 
})








/* name: la7371180
   password: q5pCE2adY1TXoaFl */
