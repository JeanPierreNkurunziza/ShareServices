const express= require('express');
const cors= require("cors");
const app= express()
const PORT=process.env.PORT || 3000

app.use(express.json({limit:'500mb'}));
app.use(cors());
app.use(express.urlencoded({extended :true,limit:'500mb'}));
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

app.use('/assets', express.static('assets'));

let db = require("./models/dbc")
db.connect()
db = db.get()
db.sequelize.sync()
//db.sequelize.sync({ alter: true })
// db.sequelize.sync({force: true, logging: console.log})
 // db.sequelize.drop();
// console.log('all the tables dropped')
const userRouter = require("./routers/user.router")
app.use("/users", userRouter)
const roleRouter = require("./routers/role.router")
app.use("/roles", roleRouter)

const competenceRouter = require("./routers/competence.router")
app.use("/competences", competenceRouter)

const memberRouter = require("./routers/member.router")
app.use("/members", memberRouter)

const quartierRouter = require("./routers/quartier.router")
app.use("/quartiers", quartierRouter) 

const serviceRouter = require("./routers/service.router")
app.use("/services", serviceRouter) 

app.all("*", (req, res, next)=>{
    console.log("Attention please the route not found !!!!")
    res.end()
})

app.listen(PORT, console.log(`The server of express is running ${PORT}`))  