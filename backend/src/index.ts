import express, { Express } from 'express';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());


// Each controller will have its own route file
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});