"use client";
import React from "react";
import { useTheme } from "next-themes";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

import "@blocknote/react/style.css";
import { upload } from "@/apis";
import { useMutation } from "@tanstack/react-query";

interface EditorProps {
	onChange: (value: string) => void;
	initialContent?: string;
	editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
	const { mutateAsync: uploadFile } = useMutation({
		mutationKey: ["UploadFile"],
		mutationFn: upload
	});

	const editor: BlockNoteEditor = useBlockNote({
		editable,
		initialContent: initialContent ? JSON.parse(initialContent) : undefined,
		onEditorContentChange: editor => {
			onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
		},

		uploadFile: async data => {
			const response = await uploadFile(data);
			return response.url;
		}
	});
	const { resolvedTheme } = useTheme();
	return (
		<div>
			<BlockNoteView
				editor={editor}
				theme={resolvedTheme === "dark" ? "dark" : "light"}
			/>
		</div>
	);
};

export default Editor;
