import { Banner } from "@primer/react";

import DefaultLayout from "../../../../interface/DefaultLayout";
import { useRouter } from "next/router";

export function ActivateUserPage() {
  const router = useRouter();
  console.log("token", router.query.activationTokenId);

  return (
    <DefaultLayout contentWidth="small" metadata={{ title: "Ativar cadastro" }}>
      <Banner
        variant="warning"
        title="Falta só uma etapa!"
        description="Abra o email enviado pelo FinTab e clique no link de confirmação."
      />
    </DefaultLayout>
  );
}
