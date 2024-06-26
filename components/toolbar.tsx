"use client"

import React, { ElementRef, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { EventName, socket } from "@/lib"
import { useCoverStore, userStore } from "@/store"
import { ImageIcon, Smile, X } from "lucide-react"
import { useDebounce } from "usehooks-ts"

import { IconPicker } from "./icon-picker"
import { Button, Textarea } from "./ui"

interface ToolbarProps {
  initialData: any
  preview?: boolean
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const params = useParams()
  const { user } = userStore()

  const refValue = useRef(false)
  const inputRef = useRef<ElementRef<"textarea">>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [icon, setIcon] = useState(initialData?.icon)
  const [value, setValue] = useState(initialData?.title)

  const debouncedTitle = useDebounce(value, 700)
  const { onOpen } = useCoverStore()

  const enableInput = () => {
    if (preview) return
    setIsEditing(true)
    setTimeout(() => {
      setValue(initialData.title)
      inputRef.current?.focus()
    }, 0)
  }

  const disableInput = () => setIsEditing(false)

  const onInput = (value: string) => setValue(value)

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      disableInput()
    }
  }

  const onIconSelect = (icon: string) => {
    setIcon(icon)
    socket.emit(EventName.UpdateIconDocument, {
      id: params.documentId,
      userId: user?.id,
      icon,
    })
  }

  const onRemoveIcon = () => {
    setIcon(null)
    socket.emit(EventName.UpdateIconDocument, {
      id: params.documentId,
      userId: user?.id,
      icon: null,
    })
  }

  React.useEffect(() => {
    const updateTitle = () => {
      socket.emit(EventName.UpdateTitleDocument, {
        id: params?.documentId,
        userId: user?.id,
        title: value,
      })
    }

    if (refValue.current) {
      updateTitle()
    }
    refValue.current = true
  }, [debouncedTitle])

  return (
    <div className="pl-[54px] group relative">
      {!!icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon -mt-8">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">{icon}</p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <Textarea
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          rows={1}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none border-none ring-0 focus-visible:ring-0"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] min-h-[80px] px-3 py-2"
        >
          {value || initialData.title}
        </div>
      )}
    </div>
  )
}

export default Toolbar
