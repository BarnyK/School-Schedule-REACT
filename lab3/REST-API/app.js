const express = require('express');
var activityRouter = require('./routes/activity');
var roomRouter = require('./routes/room');
var subjectRouter = require('./routes/subject');
var teacherRouter = require('./routes/teacher');
var groupRouter = require('./routes/group');
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/activity', activityRouter);
app.use('/room', roomRouter);
app.use('/subject', subjectRouter);
app.use('/teacher', teacherRouter);
app.use('/group', groupRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})