"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui";
import { useDetailDocumentQuery } from "./_query";
import { EventName, socket } from "@/lib";
import { userStore } from "@/store";
import Toolbar from "@/components/toolbar";

type DocumentIdProps = {
	params: {
		documentId: string;
	};
};
const DocumentIdPage = ({ params }: DocumentIdProps) => {
	const Editor = useMemo(
		() => dynamic(() => import("@/components/editor"), { ssr: false }),
		[]
	);

	const router = useRouter();

	const { user } = userStore();

	const { data: document, isError } = useDetailDocumentQuery(params.documentId);

	const onChange = (content: string) => {
		setTimeout(() => {
			socket.emit(EventName.UpdateContentDocument, {
				userId: user?.id,
				id: params.documentId,
				content
			});
		}, 500);
	};

	if (isError) {
		router.push("/documents");
	}

	if (document === undefined) {
		return (
			<div>
				<Cover.Skeleton />
				<div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
					<div className='space-y-4 pl-8 pt-4'>
						<Skeleton className='h-14 w-[50%]' />
						<Skeleton className='h-4 w-[80%]' />
						<Skeleton className='h-4 w-[40%]' />
						<Skeleton className='h-4 w-[60%]' />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='pb-40'>
			<Cover url={document.coverImage} />
			<div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
				<Toolbar initialData={document} />
				<Editor onChange={onChange} initialContent={document.content} />
			</div>
		</div>
	);
};

export default DocumentIdPage;
