import { join } from "node:path";
import migrationRunner from "node-pg-migrate";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const dbClient = await database.getNetClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: false,
    dir: join("infra", "migrations"),
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

  return response.status(405).end(); // Method not Allowed
}
