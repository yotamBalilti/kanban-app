import app from './app';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(` App is running at http://localhost:${port} in %s mode`);
  console.log(' Press CTRL-C to stop \n');
});
