exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    // For reference, GitHub limits usernames to 39 characters.
    username: {
      type: "varchar(39)",
      notNull: true,
      unique: true,
    },
    // why 254 in lenght? https://stackoverflow.com/a/1199238
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },
    // why 72 in lenght? https://security.stackexchange.com/q/39849
    password: {
      type: "varchar(82)",
      notNull: true,
    },
    // why timestamp with time zone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
  });
};

exports.down = false;
