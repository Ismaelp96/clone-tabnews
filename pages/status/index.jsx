import useSWR from "swr";
import { Banner, Heading, Stack } from "@primer/react";

import DefaultLayout from "interface/DefaultLayout";
import { Card } from "@primer/react/experimental";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function Status() {
  return (
    <DefaultLayout contentWidth="medium" metadata={{ title: "Status" }}>
      <Stack gap="spacious">
        <Heading as="h1">Status</Heading>
        <DatabaseStatus />
        <UpdatedAt />
      </Stack>
    </DefaultLayout>
  );
}

function DatabaseStatus() {
  const { data, isLoading, error } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  
  if(error) {
    return (
      <banner>
        <Banner.Title>Erro ao carregar dados.</Banner.Title>
        <Banner.Description>{error.message}</Banner.Description>
      </banner>
    )
  }

  if (isLoading || !data) {
    return;
  }


  const database = data.dependencies.database;
  const openedConnections = database.opened_connections;
  const databaseVersion = database.version ?? "-";
  const maxConnections = database.max_connections;

  return (
    <Stack>
      <Heading as="h2" variant="medium">
        Database
      </Heading>
      <Stack direction={{ narrow: "vertical", regular: "horizontal" }}>
       <Stack.Item grow>
         <Card>
          <Card.Heading>Conexões Abertas</Card.Heading>
          <Card.Description>{openedConnections}</Card.Description>
          <Card.Metadata>Uso neste instante</Card.Metadata>
        </Card>
       </Stack.Item>
        <Stack.Item grow>
         <Card>
          <Card.Heading>Conexões máximas</Card.Heading>
          <Card.Description>{maxConnections}</Card.Description>
          <Card.Metadata>Conexões disponíveis</Card.Metadata>
        </Card>
       </Stack.Item>
      <Stack.Item grow>
          <Card>
          <Card.Heading>PostgreSQL</Card.Heading>
          <Card.Description>{databaseVersion}</Card.Description>
          <Card.Metadata>Versão em execução</Card.Metadata>
        </Card>
      </Stack.Item>
      
      </Stack>
    </Stack>
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
    <Banner variant="info" layout="compact">
      <Banner.Title> Útilma atualização: {updatedAtText}</Banner.Title>
    </Banner>
  );
}
