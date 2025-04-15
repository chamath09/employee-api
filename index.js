import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import departmentRouter  from './routes/department.js';
import employeeRouter  from './routes/employee.js';
import connectToDatabase from './db/db.js';
import salaryRouter from './routes/Salary.js';
import leaveRouter from './routes/leave.js';
import SettingRouter from './routes/setting.js';

connectToDatabase();
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "https://employee-frontend-orcin.vercel.app/api",
    credentials: true,
  })
);
app.use(express.json());

app.use(express.static('public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', SettingRouter) ;



app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

