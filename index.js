require('dotenv').config();
const express = require('express');
const { Counter, register } = require('prom-client');


const app = express();

app.use(express.json());

const counter = new Counter({
  name: 'http_requests_total',
  help: 'Example of a counter',
  labelNames: ['method', 'path']
});

const fibonacci = (n) => n < 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);

app.post('/', (req, res) => {
  counter.inc({ method: req.method, path: req.path });
  res.send(`Fibonacci of ${req.body.number} is ${fibonacci(req.body.number)}`);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.getSingleMetricAsString('http_requests_total'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));