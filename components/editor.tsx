"use client"

import React, { useState } from "react"
import {
  BlockNoteEditor,
  filterSuggestionItems,
  PartialBlock,
} from "@blocknote/core"
import {
  BlockNoteView,
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react"
import { useMutation } from "@tanstack/react-query"
import { Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"

import "@blocknote/react/style.css"

import { upload, writeContentAIApi } from "@/apis"

import { Spinner } from "./spinner"
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Textarea,
} from "./ui"

type FormType = { prompt: string }
interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme()

  const [openPrompt, setOpenPrompt] = useState<boolean>(false)

  const { mutateAsync: uploadFile } = useMutation({
    mutationKey: ["UploadFile"],
    mutationFn: upload,
  })

  const { mutateAsync: writeContentAI, isPending: isPendingAI } = useMutation({
    mutationKey: ["WriteContentAI"],
    mutationFn: writeContentAIApi,
  })

  const onOpenPrompt = () => setOpenPrompt(!openPrompt)

  const insertAI = (_editor: BlockNoteEditor) => ({
    title: "Write with AI",
    onItemClick: () => onOpenPrompt(),
    aliases: ["geminiai", "ai"],
    group: "AI Content",
    icon: <Sparkles size={18} />,
    subtext: "Used to insert paragraph with AI",
  })

  const getCustomSlashMenuItems = (
    editor: BlockNoteEditor
  ): DefaultReactSuggestionItem[] => [
    insertAI(editor),
    ...getDefaultReactSlashMenuItems(editor),
  ]

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    uploadFile: async (data) => {
      const response = await uploadFile(data)
      return response.url
    },
  })

  const form = useForm<FormType>()

  const onSubmit = async (data: FormType) => {
    const content = await writeContentAI(data.prompt)
    const currentBlock = editor.getTextCursorPosition().block

    const helloWorldBlock: PartialBlock = {
      type: "paragraph",
      content: [{ type: "text", text: content, styles: { bold: false } }],
    }

    editor.insertBlocks([helloWorldBlock], currentBlock, "before")
    onOpenPrompt()
    form.reset({ prompt: undefined })
  }

  return (
    <>
      <BlockNoteView
        editable={editable}
        editor={editor}
        slashMenu={false}
        onChange={() => onChange?.(JSON.stringify(editor.document))}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
      {openPrompt && (
        <Dialog open={openPrompt} onOpenChange={onOpenPrompt}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogContent>
              <DialogTitle>Nội dung AI</DialogTitle>
              <Textarea
                {...form.register("prompt")}
                placeholder="Nhập nội dung bạn muốn AI hỗ trợ"
                cols={10}
                className="resize-none h-32"
              />
              <DialogFooter>
                <Button onClick={form.handleSubmit(onSubmit)}>
                  {isPendingAI ? <Spinner /> : "Gửi"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      )}
    </>
  )
}

export default Editor
