declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'test' | 'dev' | 'prod';
    PG_PORT: string;
    PG_USERNAME: string;
    PG_PASSWORD: string;
  }
}
