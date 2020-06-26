const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);
const cors = require('cors');
const uuid = require('uuid/v4');
const shortid = require('shortid');
const Razorpay = require('razorpay');

const bodyParser = require('body-parser');
const session = require('./models/Session');
const admin = require('./models/Admin');
// Connect Database
connectDB();
const users = {};

const socketToRoom = {};
// Init Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/dashboard', require('./routes/api/dashboard'));
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on('connection', (socket) => {
  socket.on('join room', (roomID) => {
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit('room full');
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit('all users', usersInThisRoom);
  });

  socket.on('sending signal', (payload) => {
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID
    });
  });

  socket.on('returning signal', (payload) => {
    io.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: socket.id
    });
  });

  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
    }
  });
});

const razorpay = new Razorpay({
  key_id: 'rzp_live_3GrJAUlyCczjTl',
  key_secret: 'Imss4UYoMJIElxucksnJnBjm'
});

app.get('/logo.svg', (req, res) => {
  res.sendFile(path.join(__dirname, 'logo.svg'));
});

app.post('/verification', async (req, res) => {
  // do a validation
  const secret = '12345678';

  console.log(req.body);

  const crypto = require('crypto');

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  console.log(digest, req.headers['x-razorpay-signature']);

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('request is legit');
    // process it
    const adminn = await admin.findById('5ed915f5282570ce2c943e44');
    const addsession = { bill: JSON.stringify(req.body, null, 4) };

    adminn.paymentbillsviawebhook.unshift(addsession);
    await adminn.save();
    require('fs').writeFileSync(
      'payment1.json',
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: 'ok' });
});

app.post('/razorpay', async (req, res) => {
  const payment_capture = 1;
  const amount = 1999;
  const currency = 'INR';

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    });
  } catch (error) {
    console.log(error);
  }
});
app.post('/sessions', async (req, res) => {
  console.log(req.body.uuser);
  res.status(201).json(req.body.uuser._id);
  session.findOneAndUpdate(
    { user: req.body.uuser._id },
    { $set: { roomid: req.body.paymentid } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }

      console.log(doc);
    }
  );
  const adminn = await admin.findById('5ed915f5282570ce2c943e44');
  const addsession = { user: req.body.uuser._id, roomid: req.body.paymentid };

  adminn.sessions.unshift(addsession);
  adminn.allsessions.unshift(addsession);
  await adminn.save();
});

app.post('/gotoroom', async (req, res) => {
  console.log(req.body.uuser);

  session.find({ user: req.body.uuser._id }, (err, doc) => {
    if (err) {
      console.log('Something wrong when updating data!');
    }
    console.log(doc);
    res.status(200).json(doc[0].roomid);
  });
});

app.post('/roomidstatus', async (req, res) => {
  console.log(req.body.uuser);

  session.find({ user: req.body.uuser._id }, (err, doc) => {
    if (err) {
      console.log('Something wrong when updating data!');
    }
    console.log(doc);
    res.status(200).json(doc[0].roomid);
  });
});

app.post('/available', async (req, res) => {
  let uu = await admin.findOneAndUpdate(
    { _id: '5ed915f5282570ce2c943e44' },
    { $set: { availablity: true } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }

      console.log(doc);
    }
  );
  res.status(201).json('availability set');
});
app.post('/unavailable', async (req, res) => {
  let uu = await admin.findOneAndUpdate(
    { _id: '5ed915f5282570ce2c943e44' },
    { $set: { availablity: false } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }

      console.log(doc);
    }
  );
  res.status(201).json('availability set');
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
