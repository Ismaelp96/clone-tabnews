import { resolve } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  let dbClient;
  try {
    dbClient = await database.getNetClient();

    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: false,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pedingMigrations = await migrationRunner(defaultMigrationOptions);
      await dbClient.end();
      response.status(200).json(pedingMigrations);
    }

    if (request.method === "POST") {
      const migrateMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });
      await dbClient.end();

      if (migrateMigrations.length > 0) {
        return response.status(201).json(migrateMigrations);
      } else {
        return response.status(200).json(migrateMigrations);
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
