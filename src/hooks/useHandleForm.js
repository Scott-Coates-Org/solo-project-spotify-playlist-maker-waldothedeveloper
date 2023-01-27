import { useMemo, useState } from "react";

import { generateArrayOfYears } from "../utils/getYears";

//
export const useHandleForm = () => {
  const years = useMemo(() => generateArrayOfYears(), []);
  const [selectedYear, setSelectedYear] = useState("select a year");

  const handleYear = (value) => setSelectedYear(value);

  const resetInputs = () => {
    setSelectedYear("select a year");
  };

  return {
    resetInputs,
    handleYear,
    years,
    selectedYear,
  };
};
