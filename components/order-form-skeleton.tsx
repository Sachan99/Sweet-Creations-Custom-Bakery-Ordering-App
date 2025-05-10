import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrderFormSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Tabs defaultValue="loading" className="mb-8">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="loading">
              <Skeleton className="h-4 w-24" />
            </TabsTrigger>
            <TabsTrigger value="loading2">
              <Skeleton className="h-4 w-24" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="loading">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <Skeleton className="h-[200px] w-[200px] rounded-lg" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-6 w-48 mb-6" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-2 border p-3 rounded-md mb-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <div className="flex justify-between w-full">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end mt-8">
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div>
        <Card>
          <CardContent className="pt-6">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="flex justify-center mb-6">
              <Skeleton className="h-[150px] w-[150px] rounded-full" />
            </div>
            <Skeleton className="h-5 w-40 mb-4" />

            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
