const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require('../helpers/responseHelper');
const validate = require('validate.js');

const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: '^E-post behöver vara minst %{count} tecken lång.',
      tooLong: '^E-post kan inte vara mer än %{count} tecken lång.',
    },
    email: {
      message: '^E-epost är i ett felaktigt format.',
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

async function getAll() {
  try {
    const users = await db.user.findAll({ include: [db.cart] });
    return createResponseSuccess(users);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function login(email, password) {
  try {
    const user = await db.user.findOne({ where: { email, password } });
    if (!user) throw new Error("Couldn't find user");
    const cart = await db.cart.findOne({
      where: { user_id: user.id },
    });
    return createResponseSuccess({ user, cart });
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
async function signup(newUser) {
  try {
    const user = await db.user.create(newUser);
    const cart = await db.cart.create({
      user_id: user.id,
      userId: user.id,
    });

    return createResponseSuccess({ user, cart });
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function update(user, id) {
  const invalidData = validate(user, constraints);
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    await db.user.update(user, {
      where: { id },
    });
    return createResponseMessage(200, 'User updated');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
async function destroy(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    await db.user.destroy({
      where: { id },
    });
    return createResponseMessage(200, 'User deleted');
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function myCart(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    const carts = await db.cart.findAll({
      where: { user_id: id },
      include: [db.cartRow],
    });
    return createResponseSuccess(carts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = { getAll, login, signup, destroy, update, myCart };
