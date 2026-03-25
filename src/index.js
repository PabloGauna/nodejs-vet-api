const app = require('./app');
const { initializeDatabase } = require('./db/initDb');

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
    process.exit(1);
  }
}

startServer();
