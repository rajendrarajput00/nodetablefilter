const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

//middleware
app.use(cors());
app.use(express.json()); //req.body



//ROUTES//

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.post("/submit", urlencodedParser, (req, res) => {


  var insertData = "INSERT INTO clientinfo (client_name, project_name,project_cost) VALUES ('" + req.body.client_name + "', '" + req.body.project_name + "'," + req.body.project_cost + ")";

  const insert_id = pool.query(insertData);

  res.send('data save save success fully')

})



app.post('/filter',urlencodedParser,async (req, res) => {

  const allTodos = await pool.query("SELECT * FROM  clientinfo where project_cost = "+req.body.project_cost+" or project_name = '"+req.body.project_name+"' or client_name = '"+req.body.client_name+"'");
  res.render('Demo', {
    title: 'fdffdfdf',
    records: allTodos.rows,
  })
})

app.get("/", async (req, res) => {
  try {
        const allTodos = await pool.query("SELECT * FROM  clientinfo");
        //res.json(allTodos.rows);
        // console.log('jj',allTodos.rows[0].client_id);
        res.render('Demo', {
          title: 'fdffdfdf',
          records: allTodos.rows,
        })
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(50008, () => {
  console.log("server has started on port 50008");
});