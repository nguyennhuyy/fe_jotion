import {
	DialogCreateItem,
	MainWorkSpace,
	WorkSpaceContextProvider
} from "../../_components/workspace";

const WorkSpace = () => {
	return (
		<WorkSpaceContextProvider>
			<MainWorkSpace />
			<DialogCreateItem />
		</WorkSpaceContextProvider>
	);
};

export default WorkSpace;
