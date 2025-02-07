import { useEffect, useState } from "react";

export const useUserRegion = () => {
  const [region, setRegionCode] = useState<string | null>(null);

  useEffect(() => {
    const getRegionCode = async () => {
      try {
        // Use a geolocation API to get the user's region code based on their IP address
        const response = await fetch("http://ip-api.com/json/");
        const data = await response.json();
        
        // Return the region code if available (e.g., "US", "CA")
        return data.countryCode || null;
      } catch (error) {
        console.error("Error fetching region code:", error);
        return null;
      }
    };

    // Fetch the region code and set the state
    getRegionCode().then((code) => setRegionCode(code));
  }, []);

  return { region };
};
