"use client"

import React, { useMemo, useState } from "react"
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
  SuggestionMenuProps,
  useBlockNoteEditor,
  useCreateBlockNote,
} from "@blocknote/react"
import { Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

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
    title: "Viết bằng AI",
    onItemClick: () => onOpenPrompt(),
    aliases: ["geminiai", "ai"],
    group: "AI",
    icon: <Sparkles size={18} />,
    subtext: "Sử dụng AI để hỗ trợ viết nội dung",
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
          getItems={async (query) => {
            return filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }}
          suggestionMenuComponent={CustomSlashMenu}
        />
      </BlockNoteView>
      {openPrompt && (
        <Dialog open={openPrompt} onOpenChange={onOpenPrompt}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogContent>
              <DialogTitle>Nội dung AI</DialogTitle>
              <Textarea
                {...form.register("prompt")}
                placeholder="Nhập nội dung bạn muốn AI hỗ trợ viết giúp bạn nhé"
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

export function CustomSlashMenu(
  props: SuggestionMenuProps<DefaultReactSuggestionItem>
) {
  const editor = useBlockNoteEditor()

  // Sorts items into their groups.
  const groups: Record<string, DefaultReactSuggestionItem[]> = {}
  for (const item of props.items) {
    const group = item.group || item.title

    if (!groups[group]) {
      groups[group] = []
    }

    groups[group].push(item)
  }

  const translateSlash = useMemo(
    () => (group: string, title?: string, subtext?: string) => {
      let newHeading, newTitle, newSubtext

      if (group === "AI") {
        newHeading = group
        newTitle = title
        newSubtext = subtext
      }

      if (group === "Headings") {
        newHeading = "Tiêu đề"
        switch (title) {
          case "Heading 1":
            newTitle = "Tiêu đề 1"
            newSubtext = "Được sử dụng cho tiêu đề cấp cao nhất"
            break
          case "Heading 2":
            newTitle = "Tiêu đề 2"
            newSubtext = "Được sử dụng cho các phần chính"
            break
          case "Heading 3":
            newTitle = "Tiêu đề 3"
            newSubtext = "Dùng cho các tiểu mục và đề mục nhóm"
            break

          default:
            newTitle = title
            break
        }
      }

      if (group === "Basic blocks") {
        newHeading = "Khối cơ bản"
        switch (title) {
          case "Numbered List":
            newTitle = "Danh sách số"
            newSubtext = "Dùng để hiển thị danh sách đánh số"
            break
          case "Bullet List":
            newTitle = "Danh sách chấm"
            newSubtext = "Dùng để hiển thị danh sách không có thứ tự"
            break
          case "Paragraph":
            newTitle = "Đoạn văn"
            newSubtext = "Được sử dụng cho nội dung tài liệu"
            break

          default:
            newTitle = title
            break
        }
      }
      if (group === "Advanced") {
        newHeading = "Nâng cao"
        switch (title) {
          case "Table":
            newTitle = "Bảng"
            newSubtext = "Dùng để hiển thị bảng"
            break
          default:
            newTitle = title
            break
        }
      }

      if (group === "Media") {
        newHeading = "Nâng cao"
        switch (title) {
          case "Image":
            newTitle = "Ảnh"
            newSubtext = "Chèn hình ảnh"
            break
          default:
            newTitle = title
            break
        }
      }

      return {
        newHeading,
        newTitle,
        newSubtext,
      }
    },
    [groups]
  )

  // If query matches no items, shows "No matches" message.
  if (props.items.length === 0) {
    return <div className={"slash-menu"}>No matches</div>
  }

  return (
    <div
      className={
        "bg-white shadow-[rgb(207,207,207)_0px_4px_12px_0px] rounded-[6px] border border-transparent p-0.5 overflow-auto pb-2"
      }
    >
      {Object.entries(groups).map(([group, items]) => {
        return (
          // Component for each group
          <div key={group} className={" w-[352px]"}>
            {/* Group label */}
            <div className="text-xs font-medium py-1.5 px-3 text-[rgb(99,99,99)]">
              {translateSlash(group)?.newHeading}
            </div>
            {/* Group items */}
            <div className="w-full">
              {items.map((item: DefaultReactSuggestionItem) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.title}
                    className={`h-[52px] px-3 py-1.5 flex items-center justify-between bg-white w-full rounded hover:bg-[rgb(239,239,239)] ${
                      props.items.indexOf(item) === props.selectedIndex &&
                      "bg-[rgb(239,239,239)]"
                    }`}
                    onClick={() => {
                      props.onItemClick?.(item)
                      editor.focus()
                    }}
                  >
                    <div className="mr-[10px] box-border h-[34px] w-[34px] p-2 bg-[rgb(239,239,239)] rounded">
                      {Icon}
                    </div>
                    <div className="flex flex-col items-start flex-1">
                      <p className="text-sm font-medium text-[rgb(63,63,63)]">
                        {
                          translateSlash(group, item?.title, item?.subtext)
                            ?.newTitle
                        }
                      </p>
                      <p className="text-[10px] leading-[16px] font-normal text-[rgb(63,63,63)]">
                        {
                          translateSlash(group, item?.title, item?.subtext)
                            ?.newSubtext
                        }
                      </p>
                    </div>
                    <div className="flex bg-[rgb(239,239,239)] rounded-full px-1.5">
                      <span className="text-[9px] text-[rgb(63,63,63)]">
                        {item?.badge}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
