import { useEffect, useState } from "react";

export const useUserRegion = () => {
  const [region, setRegionCode] = useState<string | null>(null);

  useEffect(() => {
    const getRegionCode = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/", {mode: "no-cors"});
        const data = await response.json();
        console.log(response);
        console.log(data);
        return data.country_code || null;
      } catch (error) {
        console.warn("Error fetching region code");
        return null;
      }
    };

    getRegionCode().then((code) => setRegionCode(code));
  }, []);

  return { region };
};
