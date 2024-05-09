import { join } from "node:path";
import migrationRunner from "node-pg-migrate";

export default async function migrations(request, response) {
  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: false,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pedingMigrations = await migrationRunner(defaultMigrationOptions);
    response.status(200).json(pedingMigrations);
  }

  if (request.method === "POST") {
    const migrateMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    if (migrateMigrations.length > 0) {
      return response.status(201).json(migrateMigrations);
    } else {
      return response.status(200).json(migrateMigrations);
    }
  }

  return response.status(405).end(); // Method not Allowed
}
