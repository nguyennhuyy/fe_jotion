import { Button } from "@/components/ui/button";

import Logo from "./logo";

const Footer = () => {
	return (
		<div className='flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]'>
			<Logo />
			<div className='md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground'>
				<Button variant='ghost' size='sm'>
					Chính sách bảo mật
				</Button>
				<Button variant='ghost' size='sm'>
					Điều khoản và điều kiện
				</Button>
			</div>
		</div>
	);
};

export default Footer;
