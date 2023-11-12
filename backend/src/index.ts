import express, { Express } from 'express';
import authRoutes from './routes/authRoutes';
import grantRoutes from './routes/grantRoutes';
import swaggerRoutes from './routes/swaggerRoutes';
import employeeRoutes from './routes/employeeRoutes';
import grantPiBridgeRoutes from './routes/grantPiRoutes'
import grantEmployeeBridgeRoutes from './routes/grantEmpRoutes'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/', swaggerRoutes);

// Each controller will have its own route file
app.use('/auth', authRoutes);
app.use('/grant', grantRoutes);
app.use('/employee', employeeRoutes);
app.use('/grantPiBridge', grantPiBridgeRoutes)
app.use('/grantEmployeeBridge', grantEmployeeBridgeRoutes)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});