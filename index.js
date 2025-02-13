const express=require('express');
const cors=require('cors');
require('dotenv').config();
const db=require('./configs/db');
const cookieParser=require('cookie-parser');
const authRoutes=require('./routes/auth.routes');
const postRoutes=require('./routes/post.routes');
const errorMiddleware=require('./middlewares/error.middleware');
const app=express();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/post",postRoutes);

app.use(errorMiddleware);

const port=process.env.PORT || 8000;
db();
app.listen(port,()=>{
    console.log(`Server is starting on ${port} port...`);
})