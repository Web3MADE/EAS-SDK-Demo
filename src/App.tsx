import React, { useState } from "react";
import { SCHEMA, SCHEMA_DETAILS } from "./config/config";
import { useEAS } from "./hooks/useEAS";

type AttestationDetails = {
  attestationData: string;
  // Add other attestation-related fields here
};

// TODO: Keep admin --> client flow in react state when switching
// 1. implement SDK logic
const App = () => {
  const { eas, schemaRegistry } = useEAS();
  const [schemaUID, setSchemaUID] = useState<string>(
    "0x5dd52dd5116bc3b40c166ecad9edfa039ffc7cf594d6513a57ea2637a492cbd6"
  );
  const [attestationDetails, setAttestationDetails] =
    useState<AttestationDetails>({ attestationData: "" });
  const [attestationId, setAttestationId] = useState<string>("");
  const [isRecommended, setIsRecommened] = useState(false);

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

  const handleReccomendationChange = () => {
    setIsRecommened((prev) => !prev);
  };

  // Handlers for button clicks (to be implemented)
  // TODO now: continue sdk implementation
  const registerSchema = async () => {
    if (!schemaRegistry) return;
    const transaction = await schemaRegistry.register({
      schema: SCHEMA,
      resolverAddress: undefined,
      revocable: true,
    });
    // schemaRegistry returns uid from event emitted on registration
    const uid = await transaction.wait();
    setSchemaUID(uid);
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
        {!schemaUID
          ? "1: Freelancer registers a schema for their own reputation"
          : "2: Client creates attestation for Freelancer`s credibility"}
      </h2>

      {!schemaUID && (
        <>
          <h2>Register Schema</h2>
          <div>
            <strong>Schema Name:</strong> {SCHEMA_DETAILS.schemaName}
          </div>
          <div>
            <strong>Client Name:</strong> {SCHEMA_DETAILS.clientName}
          </div>
          <div>
            <strong>Value of Work:</strong> {SCHEMA_DETAILS.valueOfWork}
          </div>
          <div>
            <strong>Recommend:</strong> {SCHEMA_DETAILS.recommend}
          </div>
          <button onClick={registerSchema}>Register Schema</button>
        </>
      )}

      <h2>Create Attestation</h2>
      <input
        type="text"
        name="freelancer"
        value={attestationDetails.attestationData}
        onChange={handleAttestationChange}
        placeholder="Freelancer"
      />
      <input
        type="text"
        name="valueOfWork"
        value={attestationDetails.attestationData}
        onChange={handleAttestationChange}
        placeholder="Value of work (1-100)"
      />
      <label htmlFor="recommendCheckbox">
        Would you recommend this freelancer?
      </label>
      <input
        type="checkbox"
        id="recommendCheckboxTrue"
        name="recommend"
        checked={isRecommended}
        onChange={handleReccomendationChange}
      />
      <button onClick={createAttestation}>Create Attestation</button>

      <h2>Revoke Attestation</h2>
      <input
        type="text"
        name="freelancer"
        value={attestationDetails.attestationData}
        onChange={handleAttestationChange}
        placeholder="Freelancer"
      />
      <button onClick={revokeAttestation}>Revoke Attestation</button>
    </div>
  );
};

export default App;
