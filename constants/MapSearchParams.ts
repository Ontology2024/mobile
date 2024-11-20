import { createContext, useContext, Dispatch, SetStateAction } from "react";

export const MapSearchParams = createContext<{
  start: string;
  dest: string;
  setSearchParams: Dispatch<SetStateAction<{ start: string, dest: string }>>
}>({
  start: "",
  dest: "",
  setSearchParams: () => {},
});
