"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"

import { getAllUserAdminApi } from "@/apis/admin.api"
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"

const PageUser = () => {
  const { data: users } = useQuery({
    queryKey: ["GetAllUser"],
    queryFn: getAllUserAdminApi,
  })
  return (
    <>
      <h1 className="font-bold text-xl mb-3">Danh sách người dùng</h1>
      <Card>
        <CardContent className="pt-4">
          <div className="space-y-8">
            {(users || [])?.map((user: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt="Avatar" />
                    <AvatarFallback className="uppercase">
                      {user?.fullname?.slice(-1)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.fullname}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user?.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {user?.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default PageUser
