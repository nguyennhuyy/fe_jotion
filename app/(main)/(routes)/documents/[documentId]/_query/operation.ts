import { useQuery } from "@tanstack/react-query";
import { TypeQuery } from "./enum";
import { getDocumentsApi } from "@/apis";

export const useDetailDocumentQuery = (id: string) =>
	useQuery({
		queryKey: [TypeQuery.DetailDocument, id],
		queryFn: () => getDocumentsApi(id)
	});
