import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  BaseSchema,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const tables: readonly BaseSchema[] = [
  {
    name: 'userInfo',
    columns: [
      { name: 'name', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'password', type: 'string' },
      { name: 'person_id', type: 'int' },
    ]
  }
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

// Define the database schema
export type userInfoRecord = XataRecord & {
  email: string;
  password: string;
  name: string;
  person_id: number;
};

export type DatabaseSchema = {
  userInfo: userInfoRecord; // Ensure this matches the table name
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://Gabriel254-s-workspace-cvhlb9.us-east-1.xata.sh/db/simpleDB",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
