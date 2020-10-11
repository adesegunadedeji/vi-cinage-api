import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';
import session  from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
// import rfs from 'rotating-file-stream';
// import path from 'path';
import { Router as api} from './src/api/index.js'
dotenv.config();

const app = express();
//server works --200 status
app.get('/', (req, res) => {
  res.status(200).send('<p style="text-align: center; font-weight: 600">Welcome to VICINAGE API...</p>');
})
app.use('/api', api);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
// app.use(cors({origin:"*"}))
app.use(morgan('dev'));
app.use(helmet());
app.set('trust proxy', 1) // trust first proxy
//MiddleWare for User Login
//CORS allows request to come in from React
// const corsOptions={
//     credentials:true,
//     origin:'http://localhost:3000',// Include Allowable Origin
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));

app.use(session({
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie: { secure: true }
}));

app.use((req,res,next)=>{
  console.log('this is who is logged in ', req.body.username)
  next();
});

//MiddleWare
// parse application/x-www-form-urlencoded
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

//Connect to Database
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connected"))
    .catch(err => console.log("could not connect to database", err));
app.on('error', (err) => {
  console.error(`Express server error ${err}`);
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`listening on  PORT ${PORT}`);
})
export { app as server };

