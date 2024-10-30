"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Download } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const UserSummary = ({
  total
}: {
  total: number
}) => {


  const searchParams = useSearchParams()
  const [downloadUrl, setDownloadUrl] = useState('/download')

  useEffect(() => {
    setDownloadUrl(`/download?${searchParams.toString()}`)
  }, [searchParams])

  return <div className="flex flex-row items-end mb-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Result items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-bold">
          {total.toLocaleString()}
        </div>
      </CardContent>
    </Card>
    <div className="flex-1"></div>
    <div>
      <Button asChild>
        <Link href={downloadUrl} target="_blank">
          <Download className="w-4 h-4" />
          Download results
        </Link>
      </Button>
    </div>
  </div>

}