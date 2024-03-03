import { useQuery } from "@tanstack/react-query";
import { TypeQuery } from "./enum";
import { getPublicDocumentsApi } from "@/apis";

export const useGetPublicDocsQuery = (id: string) =>
	useQuery({
		queryKey: [TypeQuery.PublicDocs, id],
		queryFn: () => getPublicDocumentsApi(id)
	});
