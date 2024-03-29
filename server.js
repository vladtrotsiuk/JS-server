const express = require('express');
const app = express();

let users = [{
    id: 1,
    name: "Антон",
    age: 25
  },
  {
    id: 2,
    name: "Марина",
    age: 20
  },
  {
    id: 3,
    name: "Людвиг",
    age: 30
  },
  {
    id: 4,
    name: "Себастьян",
    age: 15
  }
]

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('dashboard.ejs', {
    users: users
  });
});

app.get('/get_user', function(req, res) {
  try {
    if (!req.query.id) {
      throw 'No id param'
    };
    res.send(users[req.query.id]);
  } catch (e) {
    res.statusCode = 404;
    res.end("Resourse not found!");
  }
});

app.get('/get_all', function(req, res) {
  res.send(users);
});

app.get('/add_user', function(req, res) {
  try {
    if (isNaN(req.query.age)) {
      throw 'Age is not valid'
    };
    users[users.length] = {
      id: users[users.length - 1].id + 1,
      name: req.query.name,
      age: req.query.age
    }
    res.send(users);
  } catch (e) {
    res.statusCode = 415;
    res.end("Age is not valid");
  }
});

app.get('/delete_user', function(req, res) {
  try {
    if (!req.query.id) {
      throw 'No id param'
    };

    let user_number = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == req.query.id) {
        user_number = i;
      };
    };
    users.splice(user_number, 1);
    res.send(users);

  } catch (e) {
    res.statusCode = 404;
    res.end("Resourse not found!");
  }

});

app.get('/edit_user', function(req, res) {
  try {
    let exist = 0;
    for (let i = 0; i < users.length; i++) {
      if (req.query.id == users[i].id) {
        exist = 1;
      };
    };
    if (!exist) {
      throw 'User with this id does not exist'
    };

    let user_number = 0;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == req.query.id) {
        user_number = i;
      };
    };
    users[user_number] = {
      id: req.query.id,
      name: req.query.name,
      age: req.query.age
    };
    res.send(users);

  } catch (e) {
    res.statusCode = 404;
    res.end("User with this id does not exist");
  }

});


app.listen(3000);
