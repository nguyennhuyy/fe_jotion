import { api } from "@/lib";
import { UploadFileType } from "@/types";

export const upload = async (args: any): Promise<UploadFileType | any> => {
	const data = await api.post<UploadFileType>(
		// "/media/upload", path cho cloud là minio
		"/media/upload-cloud", //path cho cloud là cloudinary
		{
			file: args
		},
		{
			headers: {
				"Content-Type": "multipart/form-data"
			}
		}
	);
	return data.data;
};
