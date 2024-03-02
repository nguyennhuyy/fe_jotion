import { ChangeEvent, ElementRef, useRef } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { useUpdateCoverMutation, useUploadCoverMutation } from "./operation";
import { Button } from "../ui";
import { useCoverStore } from "@/store";

export const Upload = () => {
	const params = useParams();
	const { onReplace, onClose } = useCoverStore();

	const inputRef = useRef<ElementRef<"input">>(null);

	const { mutateAsync: uploadFile } = useUploadCoverMutation();
	const { mutateAsync: updateCoverApi } = useUpdateCoverMutation();

	const onFocusInput = () => inputRef?.current?.click();

	const onChangeInput = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = (e?.target as any)?.files[0];
		const promiseFile = uploadFile(file);
		toast.promise(promiseFile, {
			loading: "Đang tải lên hình ảnh",
			success: async data => {
				await updateCoverApi({
					id: params?.documentId as string,
					coverImage: data.url
				});
				onReplace(data.url);
				onClose();
				return "Cập nhật thành công";
			}
		});
	};

	return (
		<div className='w-full flex gap-3 flex-col justify-center items-center h-full'>
			<Button variant='outline' className='w-full' onClick={onFocusInput}>
				Tải lên
			</Button>
			<input
				type='file'
				ref={inputRef}
				onChange={onChangeInput}
				className='hidden '
			/>
			<p className='text-xs font-normal text-center mt-4'>
				Hình ảnh có độ rộng 1500px sẽ phù hợp nhất
			</p>
			<p className='text-xs font-normal text-center mt-4'>
				Kích thước tối đa cho mỗi tập tin là 5 MB.
			</p>
		</div>
	);
};
