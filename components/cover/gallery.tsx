import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import gallery_mock from "@/mocks/gallery.json";
import { useUpdateCoverMutation } from "./operation";
import { useCoverStore } from "@/store";

export const Gallery = () => {
	const params = useParams();
	const { onReplace, onClose } = useCoverStore();

	const { mutateAsync: updateCoverApi } = useUpdateCoverMutation();

	const handleUpdateCover = (url: string) => {
		const promise = updateCoverApi({
			id: params?.documentId as string,
			coverImage: url
		});
		toast.promise(promise, {
			loading: "Đang cập nhật ảnhh bìa",
			success: () => {
				onReplace(url);
				onClose();
				return "Cập nhật ảnh bìa thành công";
			}
		});
	};
	return (
		<div className='flex flex-col gap-3 mt-3'>
			<p className='text-xs font-medium text-gray-500 pl-1'>Màu & Gradient</p>
			<div className='grid grid-cols-4'>
				{gallery_mock.map((img, idx) => (
					<div
						onClick={() => handleUpdateCover(img.url)}
						key={idx}
						className='relative w-full h-16 rounded-md overflow-hidden cursor-pointer'>
						<Image
							src={img.url}
							fill
							className='p-1 rounded-md'
							style={{
								objectPosition: "center 60%"
							}}
							alt={img.name}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
