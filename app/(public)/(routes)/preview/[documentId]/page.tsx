"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import Image from "next/image";

import Toolbar from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublicDocsQuery } from "./_query/operation";

interface DocumentIdPageProps {
	params: {
		documentId: string;
	};
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
	const Editor = useMemo(
		() => dynamic(() => import("@/components/editor"), { ssr: false }),
		[]
	);

	const { data: document } = useGetPublicDocsQuery(params.documentId);

	const onChange = (content: string) => {};

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

	if (document === null) {
		return (
			<div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]'>
				<Image
					src='/documents.png'
					fill
					className='object-contain dark:hidden'
					alt='Documents'
				/>
			</div>
		);
	}

	if (!document?.isPublished) {
		return (
			<div className='flex justify-center items-center flex-col h-full'>
				<div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]'>
					<Image
						src='/documents.png'
						fill
						className='object-contain dark:hidden'
						alt='Documents'
					/>
				</div>
				<p className='text-lg font-medium'>Website chưa được công khai.</p>
			</div>
		);
	}

	return (
		<div className='pb-40'>
			<Cover preview url={document.coverImage} />
			<div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
				<Toolbar preview initialData={document} />
				<Editor
					editable={false}
					onChange={onChange}
					initialContent={document.content}
				/>
			</div>
		</div>
	);
};

export default DocumentIdPage;
