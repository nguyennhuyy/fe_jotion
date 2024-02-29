export type DocumentItem = {
	id: string;
	title: string;
	userId: string;
	isArchived: boolean;
	isPublished: boolean;
	content: string;
	coverImage: string;
	icon: string;
	parentDocument: string;
	createdAt: Date;
	updatedAt: Date;
};
