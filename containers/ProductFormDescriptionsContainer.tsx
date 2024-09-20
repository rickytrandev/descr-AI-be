'use client'

import React, { useState } from "react"
import { ProductForm } from "@/components/ui/ProductForm"
import DescriptionsContainer from "./DescriptionsContainer"

function ProductFormDescriptionsContainer() {
  const [descriptions, setDescriptions] = useState<string[]>([])

  return (
    <div className="m-6 grid grid-cols-3 gap-4">
      <ProductForm setDescriptions={setDescriptions} />
      <DescriptionsContainer descriptions={descriptions}/>
    </div>
  )
}

export default ProductFormDescriptionsContainer
