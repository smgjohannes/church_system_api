const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.createAdminUser = async () => {
  const password = await bcrypt.hash('g6`7wX8bv4F&hLfu,{mD9V', 10);
  const newUser = {
    name: 'Bruno',
    email: 'admin@moonsnacksfoods.com',
    password,
  };

  db.query(
    'SELECT email FROM users WHERE email = ?',
    newUser.email,
    (err, results) => {
      if (results.length === 0) {
        db.query('INSERT INTO users SET ?', newUser, (err) => {
          if (err) {
            throw err;
          }
          console.log('user created successful');
        });
      }
    }
  );
};
