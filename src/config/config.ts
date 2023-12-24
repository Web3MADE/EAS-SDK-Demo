export const FREELANCER_ADDRESS = import.meta.env.VITE_FREELANCER_ADDRESS;
export const CLIENT_ADDRESS = import.meta.env.VITE_CLIENT_ADDRESS;
// eas-sdk config
export const EAS_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
export const SCHEMA_REGISTRY_ADDRESS =
  "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia
export const SCHEMA = "string clientName, uint8 valueOfWork, bool recommend";
export const SCHEMA_DETAILS = {
  schemaName: "Freelancer Reputation",
  clientName: "string (name of client attesting to you)",
  valueOfWork: "uint8 (value between 1-100)",
  recommend: "bool (yes or no)",
};
