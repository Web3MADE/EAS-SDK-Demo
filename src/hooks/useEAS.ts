import { EAS, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useEAS = () => {
  const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
  const schemaRegistryContractAddress =
    "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia
  const [eas, setEAS] = useState<EAS>();
  const [schemaRegistry, setSchemaRegistry] = useState<SchemaRegistry>();
  // const [currentAddress, setCurrentAddress] = useState<string>();

  useEffect(() => {
    if (eas) return;
    // Initialize the sdk with the address of the EAS Schema contract address
    const easInstance = new EAS(EASContractAddress);
    const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

    // Gets a default provider (in production use something else like infura/alchemy)
    const provider = ethers.getDefaultProvider("sepolia");

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    easInstance.connect(provider);

    setEAS(easInstance);
    setSchemaRegistry(schemaRegistry);
    // setCurrentAddress(provider);
  }, [eas]);

  return { eas, schemaRegistry };
};
