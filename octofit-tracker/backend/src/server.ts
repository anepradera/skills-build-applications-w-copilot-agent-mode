import express from 'express';
import {
  sampleActivities,
  sampleLeaderboard,
  sampleTeams,
  sampleUsers,
  sampleWorkouts,
} from './data/sampleData.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users', (_request, response) => {
  response.json(sampleUsers);
});

app.get('/api/activities', (_request, response) => {
  response.json(sampleActivities);
});

app.get('/api/leaderboard', (_request, response) => {
  response.json(sampleLeaderboard);
});

app.get('/api/teams', (_request, response) => {
  response.json(sampleTeams);
});

app.get('/api/workouts', (_request, response) => {
  response.json(sampleWorkouts);
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});