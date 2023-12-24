import { EAS, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { EAS_ADDRESS, SCHEMA_REGISTRY_ADDRESS } from "../config/config";

export const useEAS = () => {
  const [eas, setEAS] = useState<EAS>();
  const [schemaRegistry, setSchemaRegistry] = useState<SchemaRegistry>();
  const [currentAddress, setCurrentAddress] = useState("");
  useEffect(() => {
    if (currentAddress) return;
    const init = async () => {
      // Initialize the sdk with the address of the EAS Schema contract address
      const easInstance = new EAS(EAS_ADDRESS);
      const schemaRegistry = new SchemaRegistry(SCHEMA_REGISTRY_ADDRESS);

      // Gets a default provider (in production use something else like infura/alchemy)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Connects an ethers style provider/signingProvider to perform read/write functions.
      easInstance.connect(signer); // allow clients to attest against freelancer's schema
      schemaRegistry.connect(signer); // allow Freelancer to register their own reputation schema
      setEAS(easInstance);
      setSchemaRegistry(schemaRegistry);
      setCurrentAddress(address);
    };
    init();

    // setCurrentAddress(provider);
  }, [eas, schemaRegistry, currentAddress]);

  return { eas, schemaRegistry, currentAddress };
};
