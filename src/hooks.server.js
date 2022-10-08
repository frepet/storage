import postgres from 'postgres';

export async function handle({event, resolve}) {
    const sql = postgres(import.meta.env.VITE_DATABASE_CONNECTION_STRING);

    event.locals = {
        sql: sql
    };

    return await resolve(event);
}
