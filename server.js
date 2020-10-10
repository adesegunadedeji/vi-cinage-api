import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session  from 'express-session'
import mongoose from 'mongoose'
import {Router as api} from './src/index.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT;
//CORS allows request to come in from React
const corsOptions={
    credentials:true,
    origin:'http://localhost:3000',// Include Allowable Origin
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


//MiddleWare for User Login
app.use(session({
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized:false,
}))

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log("database connected"))
    .catch(err => console.log("could not connect database", err));

//MiddleWare
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //can change to false
// parse application/json
app.use(bodyParser.json());

app.use((req,res,next)=>{
    console.log('this is who is logged in ', req.session.userId)
    next();
})

//server works --200 status
app.get('/', (req, res) => {
  res.status(200).send('<p style="text-align: center; font-weight: 600">Welcome to VICINAGE API ...</p>');
})
//API Routes
app.use('/api/v1/', api);

app.on('error', (err) => {
  console.error(`Express server error ${err}`);
});

app.listen(PORT, ()=>{
    console.log(`listening on  PORT ${PORT}`);
})


