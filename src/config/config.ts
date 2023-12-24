export const FREELANCER_ADDRESS = import.meta.env.VITE_FREELANCER_ADDRESS;
export const CLIENT_ADDRESS = import.meta.env.VITE_CLIENT_ADDRESS;
// eas-sdk config
export const SCHEMA = "string clientName, uint8 valueOfWork, bool recommend";
export const SCHEMA_DETAILS = {
  schemaName: "Freelancer Reputation",
  clientName: "string (name of client attesting to you)",
  valueOfWork: "uint8 (value between 1-100)",
  recommend: "bool (yes or no)",
};
