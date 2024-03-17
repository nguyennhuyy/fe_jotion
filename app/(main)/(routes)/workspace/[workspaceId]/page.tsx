import {
	DialogCreateItem,
	MainWorkSpace,
	WorkSpaceContextProvider
} from "@/app/(main)/_components/workspace";

DialogCreateItem;
const WorkSpace = () => {
	return (
		<WorkSpaceContextProvider>
			<MainWorkSpace />
			<DialogCreateItem />
		</WorkSpaceContextProvider>
	);
};

export default WorkSpace;
