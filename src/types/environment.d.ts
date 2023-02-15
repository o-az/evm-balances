declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'ci';
    INFURA_KEY: string;
    FLY_API_TOKEN: string;
    FLY_APP_NAME: string;
  }
}
