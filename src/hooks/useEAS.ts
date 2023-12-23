import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useEAS = () => {
  const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
  const [eas, setEAS] = useState<EAS>();

  useEffect(() => {
    if (!eas) {
      // Initialize the sdk with the address of the EAS Schema contract address
      const easInstance = new EAS(EASContractAddress);

      // Gets a default provider (in production use something else like infura/alchemy)
      const provider = ethers.getDefaultProvider("sepolia");

      // Connects an ethers style provider/signingProvider to perform read/write functions.
      easInstance.connect(provider);

      setEAS(easInstance);
    }
  }, [eas]);

  return eas;
};
