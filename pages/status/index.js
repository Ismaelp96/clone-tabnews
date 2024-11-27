import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function Status() {
  return (
    <>
      <UpdatedAt />
      <Database />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return (
    <>
      <h1>Status</h1>
      <p> Útilma atualização: {updatedAtText}</p>
    </>
  );
}

function Database() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const dbVersion = data.dependencies.database.version;
  const maxConnections = data.dependencies.database.max_connections;
  const openedConnections = data.dependencies.database.opened_connections;

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <ul>
        <li>Versão do banco de dados: {dbVersion}</li>
        <li>Máximo de conexões: {maxConnections}</li>
        <li>Conexões em aberto: {openedConnections}</li>
      </ul>
    );
  }
  return (
    <>
      <h2>Database</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
