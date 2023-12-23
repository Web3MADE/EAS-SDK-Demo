import React, { useState } from "react";
import { useEAS } from "./hooks/useEAS";

// Define TypeScript types for state
type SchemaDetails = {
  schemaName: string;
  // Add other schema-related fields here
};

type AttestationDetails = {
  attestationData: string;
  // Add other attestation-related fields here
};

// TODO:
// 1. finish UI for attestation
// 2. switch between admin & client view
// 3. implement SDK logic
const App = () => {
  const eas = useEAS();
  const [schemaDetails, setSchemaDetails] = useState<SchemaDetails>({
    schemaName: "",
  });
  const [attestationDetails, setAttestationDetails] =
    useState<AttestationDetails>({ attestationData: "" });
  const [attestationId, setAttestationId] = useState<string>("");

  // Handlers for input changes
  const handleSchemaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchemaDetails({ ...schemaDetails, [e.target.name]: e.target.value });
  };

  const handleAttestationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttestationDetails({
      ...attestationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleAttestationIdChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttestationId(e.target.value);
  };

  // Handlers for button clicks (to be implemented)
  const registerSchema = () => {
    console.log("Registering Schema:", schemaDetails);
    // Implement registration logic here
  };

  const createAttestation = () => {
    console.log("Creating Attestation:", attestationDetails);
    // Implement creation logic here
  };

  const revokeAttestation = () => {
    console.log("Revoking Attestation:", attestationId);
    // Implement revocation logic here
  };

  async function getAttestation() {
    if (!eas) return;
    try {
      const attestation = await eas.getAttestation(
        "0x4ee6052e832dba425c2fe53611a565a1e47630b7a741bc37e8d425fe7a2be1ec"
      );
      console.log("attestation ", attestation?.attester);
    } catch (error) {
      console.log("error getting Attestation ", error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Ethereum Attestation Service</h1>
      <h2 style={{ textAlign: "center" }}>
        Admin registers a schema for their own reputation
      </h2>

      <h2>Register Schema</h2>
      <input
        type="text"
        name="schemaName"
        value={schemaDetails.schemaName}
        onChange={handleSchemaChange}
        placeholder="Schema Name"
      />
      <input
        type="text"
        name="clientName"
        value={schemaDetails.schemaName}
        onChange={handleSchemaChange}
        placeholder="Client Name"
      />
      <input
        type="text"
        name="valueOfWork"
        value={schemaDetails.schemaName}
        onChange={handleSchemaChange}
        placeholder="Value of work (1-100)"
      />
      <input
        type="text"
        name="recommend"
        value={schemaDetails.schemaName}
        onChange={handleSchemaChange}
        placeholder="Recommend"
      />
      <button onClick={registerSchema}>Register Schema</button>

      <h2>Create Attestation</h2>
      <input
        type="text"
        name="attestationData"
        value={attestationDetails.attestationData}
        onChange={handleAttestationChange}
        placeholder="Attestation Data"
      />
      <button onClick={createAttestation}>Create Attestation</button>

      <h2>Revoke Attestation</h2>
      <input
        type="text"
        value={attestationId}
        onChange={handleAttestationIdChange}
        placeholder="Attestation ID"
      />
      <button onClick={revokeAttestation}>Revoke Attestation</button>
    </div>
  );
};

export default App;
