const app = require('./app');
const port = process.env.PORT || 3600;

// Démarrage du serveur
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}
