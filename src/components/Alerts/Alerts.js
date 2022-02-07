import React from "react";
import ClosableAlert from "./ClosableAlert/ClosableAlert";

const alertMessages = [
  {
    severity: "error",
    title: "Unsupported Network",
    text: "Please switch to Mainnet or Rinkeby.",
  },
  {
    severity: "error",
    title: "Contract is not deployed",
    text: "The app has only limited functionality.",
  },
  {
    severity: "warning",
    title: "Logout during session",
    text: "Bla.",
  },
];

function Alerts({ activeAlerts }) {
  return [...activeAlerts].map((alert) => (
    <ClosableAlert {...alertMessages[alert]} key={alert} />
  ));
}

export default Alerts;
