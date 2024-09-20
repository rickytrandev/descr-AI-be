import { useState } from "react";


const useDescriptions = () => {
  const [descriptions, setDescriptions] = useState<string[]>([])
  
  return {
    descriptions,
    setDescriptions
  }
}