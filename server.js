require('dotenv').config(); //.env require krke config() method ko call kro
const express = require('express');
const app = express();

// CORS
const cors = require('cors');

const authRouter = require('./router/auth-router');
const contactRouter = require('./router/contact-router');
const serviceRouter = require('./router/service-router');
const adminRouter = require('./router/admin-router');

const connectDB = require('./utility/db');
const errorMiddleware = require('./middleware/error-middleware');




const corsOptions = {
  origin: "http://localhost:5173", //if yaha se data aa rha hai to usko access de do
  methods: 'GET, POST, DELETE, PATCH, HEAD',//5173 ko sv method ka access de do.
  credentials: true
}



app.use(cors(corsOptions)); // express.json() ke use se data aayega to hme data dene se pehle hi to cors ka access dena padega.



app.use(express.json()) // we can use json in our application otherwise {} come
//  It is express middleware


app.use('/api/auth', authRouter);
app.use('/api/form', contactRouter);
app.use('/api/data', serviceRouter);
app.use('/api/admin', adminRouter);


app.use(errorMiddleware);



// agar db se connection ho tvi server se connect hoga.
connectDB().then(() => {
  const PORT = 3000;
  app.listen(PORT, () => { console.log(`Server running at ${PORT}`) })
})