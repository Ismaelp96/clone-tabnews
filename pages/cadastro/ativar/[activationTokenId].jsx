import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Banner } from "@primer/react";

import DefaultLayout from "interface/DefaultLayout";
import BannerInfo from "components/BannerInfo";

export function ActivateUserPage() {
  const router = useRouter();
  const activationTokenId = router.query.activationTokenId;

  const [activationStatus, setActivationStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!activationTokenId) {
      return;
    }

    sendActivationRequest();

    async function sendActivationRequest() {
      try {
        const response = await fetch(
          `/api/v1/activations/${activationTokenId}`,
          {
            method: "PATCH",
          },
        );

        const activationResponseBody = await response.json();

        if (response.status === 200) {
          setActivationStatus("success");
          return;
        }

        // sinal de fracasso para interface
        setErrorMessage(
          `${activationResponseBody.message} ${activationResponseBody.action}`,
        );
        setActivationStatus("failure");
      } catch {
        setErrorMessage(
          "Houve uma falha de conexão com o servidor. Tente novamente mais tarde.",
        );
        setActivationStatus("failure");
      }
    }
  }, [activationTokenId]);

  return (
    <DefaultLayout contentWidth="small" metadata={{ title: "Ativar cadastro" }}>
      {activationStatus === "loading" && (
        <BannerInfo variant="info" title="Verificando token..." />
      )}

      {activationStatus === "success" && (
        <BannerInfo
          variant="success"
          title="Cadastro ativado com sucesso!"
          description="Sua conta está ativa"
        />
      )}

      {activationStatus === "failure" && (
        <BannerInfo
          variant="critical"
          title="Não foi possível ativar seu cadastro."
          description={errorMessage}
        />
      )}
    </DefaultLayout>
  );
}

export default ActivateUserPage;
