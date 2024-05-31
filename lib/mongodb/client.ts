import * as Realm from 'realm-web';

export const createClient = () => new Realm.App(process.env.NEXT_PUBLIC_APP_ID!);
