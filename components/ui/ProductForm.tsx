"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImagePlus } from "lucide-react"
import { Description } from "@/containers/DescriptionsContainer"

type ErrorsProps = {
  title?: string
  brand?: string
  keywords?: string
  image?: string
  fetch?: string
}

type ProductFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  isLoading: boolean
  imagePreview: string | null
  errors: ErrorsProps
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProductForm({
  isLoading,
  handleSubmit,
  imagePreview,
  handleImageChange,
  errors,
}: ProductFormProps) {
  return (
    <div className=" mx-auto w-full">
      <div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Product Description Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImagePlus className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter product title"
                  className={`${errors.title && "border-red-500"}`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand Name</Label>
                <Input
                  id="brand"
                  name="brand"
                  placeholder="Enter brand name"
                  className={`${errors.brand && "border-red-500"}`}
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">SEO Keywords</Label>
                <Textarea
                  className={`${errors.keywords && "border-red-500"}`}
                  id="keywords"
                  name="keywords"
                  placeholder="Enter SEO keywords (comma-separated)"
                />
                {errors.keywords && (
                  <p className="text-red-500 text-sm">{errors.keywords}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-500"
              >
                Generate Descriptions
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
