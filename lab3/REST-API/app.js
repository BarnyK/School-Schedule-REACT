var express = require('express');
var cors = require('cors');
var activityRouter = require('./routes/activity');
var roomRouter = require('./routes/room');
var subjectRouter = require('./routes/subject');
var teacherRouter = require('./routes/teacher');
var groupRouter = require('./routes/group');

var app = express();
var port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('API works :)')
})

app.use('/activity', activityRouter);
app.use('/room', roomRouter);
app.use('/class', subjectRouter);
app.use('/teacher', teacherRouter);
app.use('/group', groupRouter);

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`)
})