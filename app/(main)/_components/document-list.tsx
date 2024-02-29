"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from ".";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { socket } from "@/lib";
import { EventName } from "./enum";
import { useUser } from "@clerk/clerk-react";
import { DocumentItem } from "@/types";

type DocumentListProps = {
	parentDocumentId?: string;
	level?: number;
	data?: Doc<"documents">[];
};
const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
	const params = useParams();
	const router = useRouter();
	const { user } = useUser();

	const [documents, setDocuments] = useState<DocumentItem[]>();
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});

	const onExpand = (documentId: string) => {
		setExpanded(prev => ({
			...prev,
			[documentId]: !prev[documentId]
		}));
	};

	// const documents = useQuery(api.documents.getSidebar, {
	// 	parentDocument: parentDocumentId
	// });
	const onRedirect = (documentId: string) =>
		router.push(`/document/${documentId}`);

	if (documents === undefined) {
		<>
			<Item.Skeleton level={level} />;
			{level === 0 && (
				<>
					<Item.Skeleton level={level} />;
					<Item.Skeleton level={level} />;
				</>
			)}
		</>;
	}

	useEffect(() => {
		socket.emit(EventName.GetDocument, { userId: user?.id });

		socket.on(EventName.GetDocument, (data: DocumentItem[]) => {
			setDocuments(data);
		});

		socket.on(EventName.CreateDocument, (data: any) => {
			setDocuments((prev?: DocumentItem[]) => (prev ? [...prev, data] : prev));
		});
	}, []);

	console.log("documents", documents);

	return (
		<>
			<p
				style={{
					paddingLeft: level ? `${level * 12 + 25}px` : undefined
				}}
				className={cn(
					"hidden text-sm font-medium text-muted-foreground/80",
					expanded && "last:block",
					level === 0 && "hidden"
				)}>
				No pages inside
			</p>
			{documents?.map(document => (
				<div key={document.id}>
					<Item
						id={document.id}
						// onClick={() => onRedirect(document.id)}
						label={document.title}
						icon={FileIcon}
						documentIcon={document.icon}
						active={params?.documentId === document.id}
						level={level}
						onExpand={() => onExpand(document.id)}
						expanded={expanded[document.id]}
						userId={user?.id}
					/>
					{expanded[document.id] && (
						<DocumentList
							parentDocumentId={document.id}
							level={(level as number) + 1}
						/>
					)}
				</div>
			))}
		</>
	);
};

export default DocumentList;
