const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'shopping'
});

client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  });
  
  client.query('SELECT * FROM user', (err, res) => {
    if (err) {
      console.error(err.stack)
    } else {
      console.log(res.rows)
    }
    client.end()
  });
  