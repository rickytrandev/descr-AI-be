import React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SkeletonCard } from "@/components/ui/SkeletonCard"

export type Description = {
  title: string
  description: string
}

type DescriptionsContainerProps = {
  descriptions: Description[],
  isLoading: boolean
}

function DescriptionsContainer({ descriptions, isLoading }: DescriptionsContainerProps) {

  return (
    <Card className="w-full col-span-2">
      <CardHeader>
        <CardTitle>Generated Descriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md border border-slate-200 p-4 dark:border-slate-800">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            descriptions.map((desc, index) => (
              <div
                key={desc.title}
                className="mb-4 p-4 border border-slate-200 rounded dark:border-slate-800"
              >
                <h3 className="font-semibold mb-2">Variation {index + 1}</h3>
                <p>{desc.description}</p>
              </div>
            ))
          )}
          {descriptions.length === 0 && !isLoading && (
            <p className="text-slate-500 dark:text-slate-400">
              No descriptions generated yet. Fill out the form and click
              "Generate Descriptions" to get started.
            </p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default DescriptionsContainer
