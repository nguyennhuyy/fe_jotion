export type WorkSpaceType = {
	id: string;
	title: string;
	content: string;
	avatar: string;
	tags: string[];
	workSpaceColId: string;
	createdAt: string;
	updatedAt: string;
};
export type WorkSpaceColType = {
	id: string;
	title: string;
	userId: string;
	work: WorkSpaceType[];
	updatedAt: Date;
	createdAt: Date;
};

export type CreateWorkItemType = {
	title: string;
	content: string;
	workSpaceColId: string;
	avatar: string;
};

export type DataColType = Pick<WorkSpaceColType, "id" | "title">;
