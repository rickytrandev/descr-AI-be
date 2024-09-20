import { useState } from "react"

export const useForm = (
  setDescriptions: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    title?: string
    brand?: string
    keywords?: string
    image?: string
  }>({})

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const generateDescription = (
    title: string,
    brand: string,
    keywords: string
  ) => {
    // This is a mock function. Replace with actual API call in production.
    return `${brand} presents the ${title}. ${
      keywords.split(",")[0]
    } and more. Buy now!`
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submitted")
    const form = e.currentTarget
    const title = (form.elements.namedItem("title") as HTMLInputElement).value
    const brand = (form.elements.namedItem("brand") as HTMLInputElement).value
    const keywords = (
      form.elements.namedItem("keywords") as HTMLTextAreaElement
    ).value


    const newErrors: { title?: string; brand?: string; keywords?: string, image?: string  } = {}
    if (!title) newErrors.title = "Title is required"
    if (!brand) newErrors.brand = "Brand is required"
    if (!keywords) newErrors.keywords = "Keywords are required"
    if (!image) newErrors.image = "An image is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Clear errors if validation passes
    setErrors({})

    // Generate 3 variations
    // const newDescriptions = [
    //   generateDescription(title, brand, keywords),
    //   generateDescription(title, brand, keywords),
    //   generateDescription(title, brand, keywords)
    // ]

    // setDescriptions(prev => [...newDescriptions, ...prev])
  }

  return {
    image,
    imagePreview,
    errors,
    handleImageChange,
    handleSubmit,
    generateDescription,
  }
}
