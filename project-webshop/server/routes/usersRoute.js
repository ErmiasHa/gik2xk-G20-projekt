const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');
const userService = require('../services/userService');

const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: '^E-post behöver vara minst %{count} tecken lång.',
      tooLong: '^E-post kan inte vara mer än %{count} tecken lång.',
    },
    email: {
      message: '^E-post är i ett felaktigt format.',
    },
  },
  password: {
    length: {
      minimum: 8,
      maximum: 20,
      tooShort: '^Lösenordet behöver vara minst %{count} tecken lång.',
      tooLong: '^Lösenordet kan inte vara mer än %{count} tecken lång.',
    },
    format: {
      pattern: '[A-Za-z0-9]+',
      message: '^Lösenordet är i ett felaktigt format.',
    },
  },
};

router.get('/', (req, res) => {
  userService.getAll().then((result) => {
    res.send(result);
  });
});

router.post('/signup', (req, res) => {
  const user = req.body;
  const invalidData = validate(user, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    userService.signup(user).then((result) => {
      res.send(result);
    });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const invalidData = validate(req.body, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    userService
      .login(email, password)
      .then((result) => {
        if (result.error) {
          return res.status(400).json({ message: 'Login failed' });
        }
        res.send(result);
      })
      .catch((err) => {
        res.status(401).json({ message: 'Login failed' });
      });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  userService.update(user, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  userService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.get('/:id/getCart/', (req, res) => {
  const id = req.params.id;
  userService.myCart(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
