import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      APIKEY: JSON.stringify(process.env.VITE_APIKEY),
      AUTHDOMAIN: JSON.stringify(process.env.VITE_AUTHDOMAIN),
      PROJECTID: JSON.stringify(process.env.VITE_PROJECTID),
      STORAGEBUCKET: JSON.stringify(process.env.VITE_STORAGEBUCKET),
      MESSAGINGSENDERID: JSON.stringify(process.env.VITE_MESSAGINGSENDERID),
      APPID: JSON.stringify(process.env.VITE_APPID),
      MEASUREMENTID: JSON.stringify(process.env.VITE_MEASUREMENTID),
    },
  };
});
