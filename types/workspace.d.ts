export type WorkSpaceType = {
	id: string;
	title: string;
	content: string;
	avatar: string;
	order: number;
	date: Date;
	tags: string[];
	workSpaceColId: string;
	createdAt: string;
	updatedAt: string;
};
export type WorkSpaceColType = {
	id: string;
	title: string;
	userId: string;
	order: number;
	work: WorkSpaceType[];
	updatedAt: Date;
	createdAt: Date;
};

export type CreateWorkItemType = {
	title: string;
	content: string;
	workSpaceColId: string;
	date?: Date;
	tags?: string[];
	avatar?: string;
};

export type DataColType = Pick<WorkSpaceColType, "id" | "title">;
