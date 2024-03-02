import { useMutation } from "@tanstack/react-query";
import { TypeQuery } from "./enum";
import { updateCoverImageApi, upload } from "@/apis";

export const useUploadCoverMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.UploadCover],
		mutationFn: upload
	});

export const useUpdateCoverMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.RemoveCover],
		mutationFn: updateCoverImageApi
	});
