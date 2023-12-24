import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useState } from "react";
import { SCHEMA, SCHEMA_DETAILS } from "./config/config";
import { useEAS } from "./hooks/useEAS";

type AttestationData = {
  freelancer: string;
  workQuality: number;
  recommend: boolean;
};
/** @dev AFTER REGISTERING A SCHEMA, OR MAKING AN ATTESTATION
 * IF YOU REFRESH APP MAKE SURE TO PASTE IN SCHEMA/ATTESTATIONUID IN STATE VARIABLES OR ELSE APP WONT WORK
 * */
const App = () => {
  const { eas, schemaRegistry, currentAddress } = useEAS();
  console.log("currentAddress ", currentAddress);
  // schemaUID is set when Freelancer register's their own reputation schema
  const [schemaUID, setSchemaUID] = useState<string>(
    "0x115908c1b0cc984bae16f262620dec3b9d1235372100d0ca0f115b62b43d3bfc"
  );
  const [attestationUID, setAttestationUID] = useState<string>(
    "0x4968c28d7e6a01c46c2bc1cfc5edb64a49e94801126c0c0a1d848ed72bd262c9"
  );
  const [attestationData, setAttestationData] = useState<AttestationData>({
    freelancer: "",
    workQuality: 0,
    recommend: false,
  });

  const handleAttestationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;

    setAttestationData({
      ...attestationData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // attestationUID is set when a client attests to the reputation schema

  const registerSchema = async () => {
    if (!schemaRegistry) return;
    const transaction = await schemaRegistry.register({
      schema: SCHEMA,
      resolverAddress: undefined,
      revocable: true,
    });
    const uid = await transaction.wait();
    console.log("schemaUID ", uid);
    setSchemaUID(uid);
  };

  const createAttestation = async () => {
    if (!eas || !schemaUID) return;
    const schemaEncoder = new SchemaEncoder(SCHEMA);
    const encodedData = schemaEncoder.encodeData([
      { name: "clientName", value: currentAddress, type: "string" },
      {
        name: "workQuality",
        value: attestationData.workQuality,
        type: "uint8",
      },
      { name: "recommend", value: attestationData.recommend, type: "bool" },
    ]);

    const transaction = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: attestationData.freelancer,
        expirationTime: undefined,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });

    const newAttestationUID = await transaction.wait();
    setAttestationUID(newAttestationUID);

    console.log("New attestation UID:", newAttestationUID);
    console.log("Creating Attestation:", attestationData);
  };

  const revokeAttestation = async () => {
    if (!eas) return;
    const attestation = await eas.getAttestation(attestationUID);

    const transaction = await eas.revoke({
      schema: attestation.schema,
      data: { uid: attestation.uid },
    });
    const receipt = await transaction.wait();
    console.log("Revoking Attestation:", receipt);
  };

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
          ? "Step 1: Freelancer registers a schema for their own reputation"
          : "Step 2: Client creates attestation for Freelancer`s credibility"}
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
            <strong>Value of Work:</strong> {SCHEMA_DETAILS.workQuality}
          </div>
          <div>
            <strong>Recommend:</strong> {SCHEMA_DETAILS.recommend}
          </div>
          <button onClick={registerSchema}>Register Schema</button>
        </>
      )}

      {schemaUID && (
        <>
          <h2>Create Attestation</h2>
          <input
            type="text"
            name="freelancer"
            value={attestationData.freelancer}
            onChange={handleAttestationChange}
            placeholder="Freelancer"
          />
          <input
            type="text"
            name="workQuality"
            value={attestationData.workQuality}
            onChange={handleAttestationChange}
            placeholder="Value of work (1-100)"
          />
          <label htmlFor="recommendCheckbox">
            Would you recommend this freelancer?
          </label>
          <input
            type="checkbox"
            id="recommend"
            name="recommend"
            checked={attestationData.recommend}
            onChange={handleAttestationChange}
          />
          <button onClick={createAttestation}>Create Attestation</button>

          <h2>Revoke Attestation</h2>
          <button onClick={revokeAttestation}>Revoke Attestation</button>
        </>
      )}
    </div>
  );
};

export default App;
