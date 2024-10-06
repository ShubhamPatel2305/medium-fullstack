// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        DIRECT_URL: string; // Add other env variables here
    }
}
