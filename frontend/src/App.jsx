import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

export const App = () => {
  const [proposalId, setProposalId] = useState();
  const [proprosalStatus, setProposalState] = useState();

  const { lastJsonMessage, sendMessage } = useWebSocket("ws://localhost:3333", {
    onOpen: () => console.log("Connect to WS"),
    onMessage: () => {
      if (lastJsonMessage) {
        setProposalId(lastJsonMessage.proposalId);
        setProposalState(lastJsonMessage.status);
      }
    },
    queryParams: { token: "123456" },
    onError: (event) => console.log(event),
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 3000,
  });

  const status = {
    APPROVED: "Aprovada",
    REFUSED: "Recusada",
    WAITING: "Em Análise",
  };

  const [name, setName] = useState("");

  return (
    <div className="App">
      <h1>Hello World</h1>
      <p>
        A proposta de ID: <strong>{proposalId}</strong> -{" "}
        <strong>{status[proprosalStatus]}</strong>
      </p>

      <form onSubmit={(e) => submit()}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  );
};
