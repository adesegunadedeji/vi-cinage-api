import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session  from 'express-session';
import cookieparser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
// import rfs from 'rotating-file-stream';
// import path from 'path';
import { Router as api} from './src/index.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());

//MiddleWare for User Login
app.use(session({
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized:false,
}))

//MiddleWare
// parse application/x-www-form-urlencoded


app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// create a rotating write stream for logging requests daily
// const __dirname = path.resolve();
// const serverLogStream = rfs.createStream('server.log', {
//     interval: '1d',
//     path: path.join(__dirname, 'logs')
// })
// app.use(morgan("combined", { stream: serverLogStream }));
const PORT = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connected"))
    .catch(err => console.log("could not connect database", err));



app.use((req,res,next)=>{
    console.log('this is who is logged in ', req.body.username)
    next();
})

//server works --200 status
app.get('/', (req, res) => {
  res.status(200).send('<p style="text-align: center; font-weight: 600">Welcome to VICINAGE API...</p>');
})
//API Routes
app.use('/api/v1', api);

app.on('error', (err) => {
  console.error(`Express server error ${err}`);
});

app.listen(PORT, ()=>{
    console.log(`listening on  PORT ${PORT}`);
})
export { app as server };

//CORS allows request to come in from React
// const corsOptions={
//     credentials:true,
//     origin:'http://localhost:3000',// Include Allowable Origin
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));