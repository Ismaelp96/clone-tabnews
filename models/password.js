import bcript from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();
  return await bcript.hash(password, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  return await bcript.compare(providedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
