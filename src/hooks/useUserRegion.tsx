import { useEffect, useState } from "react";

export const useUserRegion = () => {
  const [region, setRegionCode] = useState<string | null>(null);

  useEffect(() => {
    const getRegionCode = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        return data.country_code || null;
      } catch (error) {
        console.error("Error fetching region code:", error);
        return null;
      }
    };

    getRegionCode().then((code) => setRegionCode(code));
  }, []);

  return { region };
};
