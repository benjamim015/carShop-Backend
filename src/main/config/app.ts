import express from 'express';
import setupStaticFiles from './staticFiles';
import setupMiddlewares from './middlewares';
import setupRoutes from './routes';

const app = express();
setupStaticFiles(app);
setupMiddlewares(app);
setupRoutes(app);
export default app;
