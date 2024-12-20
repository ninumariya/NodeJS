import express, { request } from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose  from "mongoose";

const app = express();

app.get('/',(request,response) => {
    return response.status(234).send('Welcome to MERN stack tutorial')
})
app.listen (PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
mongoose.connect(mongoDBURL)
.then(() =>{
    console.log(`App is connecting to Database`);

})
.catch(() =>{
    console.log(error);

});