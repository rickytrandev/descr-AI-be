"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import React, { useState } from "react"
import { ProductForm } from "@/components/ui/ProductForm"
import DescriptionsContainer, { Description } from "./DescriptionsContainer"
import { useForm } from "@/hooks/useForm"

const queryClient = new QueryClient()

function ProductFormDescriptionsContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductFormDescriptions />
    </QueryClientProvider>
  )
}

function ProductFormDescriptions() {
  const [descriptions, setDescriptions] = useState<Description[]>([])
  const { errors, handleSubmit, handleImageChange, imagePreview, isLoading } = useForm(setDescriptions)

  return (
    <div className="grid grid-cols-3 gap-4">
      <ProductForm
        setDescriptions={setDescriptions}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
        imagePreview={imagePreview}
        errors={errors}
      />
      <DescriptionsContainer descriptions={descriptions} isLoading={isLoading} />
    </div>
  )
}

export default ProductFormDescriptionsContainer