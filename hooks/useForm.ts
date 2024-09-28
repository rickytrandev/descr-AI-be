import { Description } from "@/containers/DescriptionsContainer";
import { useState } from "react";
import { useMutation } from "react-query";

export const useForm = (
  setDescriptions: React.Dispatch<React.SetStateAction<Description[]>> = () => {}
) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    brand?: string;
    keywords?: string;
    image?: string;
    fetch?: string;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const fetchDescriptions = async (
    imageBase64: string,
    title: string,
    brand: string,
    keywords: string
  ): Promise<Description[]> => {
    const response = await fetch("/api/getDescriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64, title, brand, keywords }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch descriptions");
    }

    return response.json();
  };

  const mutation = useMutation(
    ({ imageBase64, title, brand, keywords }: { imageBase64: string; title: string; brand: string; keywords: string }) =>
      fetchDescriptions(imageBase64, title, brand, keywords),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        setDescriptions(data);
        setIsLoading(false);
      },
      onError: (error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fetch: "Failed to generate descriptions",
        }));
        setIsLoading(false);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    }
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const brand = (form.elements.namedItem("brand") as HTMLInputElement).value;
    const keywords = (
      form.elements.namedItem("keywords") as HTMLTextAreaElement
    ).value;

    const newErrors: {
      title?: string;
      brand?: string;
      keywords?: string;
      image?: string;
      fetch?: string;
    } = {};
    if (!title) newErrors.title = "Title is required";
    if (!brand) newErrors.brand = "Brand is required";
    if (!keywords) newErrors.keywords = "Keywords are required";
    if (!image) newErrors.image = "An image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    try {
      if (image) {
        const imageToBase64 = await fileToBase64(image);
        console.log("Calling mutation");
        mutation.mutate({ imageBase64: imageToBase64, title, brand, keywords });
      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fetch: "Failed to generate descriptions",
      }));
    }
  };

  return {
    image,
    imagePreview,
    errors,
    handleImageChange,
    handleSubmit,
    isLoading
  };
};