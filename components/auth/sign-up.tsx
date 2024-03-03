import Cookies from "js-cookie";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button, Input, Label, Validator } from "../ui";
import { useSignUpMutation } from ".";
import { RegisterType } from "@/types";
import { KeyCookie } from "@/lib";
import { Spinner } from "../spinner";
import { AuthContext } from "./context";
import { useCookie } from "@/hooks";

const SignUp = () => {
	const router = useRouter();
	const { handleToggleAuth, handleOpenDialog } = useContext(AuthContext);

	const { setItemCookie } = useCookie();

	const { mutateAsync: mutateSignUp, isPending: isPendingLogin } =
		useSignUpMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<RegisterType>();

	const onSubmit: SubmitHandler<RegisterType> = async (data: RegisterType) => {
		const response = await mutateSignUp(data);
		setItemCookie(KeyCookie.Token, response.accessToken);
		toast.success("Đăng ký tài khoản thành công");
		reset(undefined);
		handleOpenDialog?.();
		router.push("/documents");
	};
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-4 !mt-8'>
				<div className='flex flex-col w-full gap-1.5'>
					<Label htmlFor='email'>Họ và tên</Label>
					<Input
						type='text'
						id='fullname'
						error={errors.fullname}
						{...register("fullname", {
							required: "Yêu cầu họ và tên",
							minLength: {
								value: 3,
								message: "Độ dài tối thiếu 3 kí tự"
							}
						})}
					/>
					<Validator className='mt-0' error={errors.fullname}>
						{errors.fullname?.message}
					</Validator>
				</div>

				<div className='flex flex-col w-full gap-1.5'>
					<Label htmlFor='email'>Email</Label>
					<Input
						type='email'
						id='email'
						error={errors.email}
						{...register("email", {
							required: "Yêu cầu email",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Email không đúng định dạng"
							}
						})}
					/>
					<Validator className='mt-0' error={errors.email}>
						{errors.email?.message}
					</Validator>
				</div>
				<div className='flex flex-col w-full gap-1.5'>
					<Label htmlFor='password'>Mật khẩu</Label>
					<Input
						type='password'
						id='password'
						error={errors.password}
						{...register("password", {
							required: "Yêu cầu mật khẩu",
							minLength: {
								value: 6,
								message: "Độ dài tối thiếu 6 kí tự"
							}
						})}
					/>
					<Validator className='mt-0' error={errors.password}>
						{errors.password?.message}
					</Validator>
				</div>
				<Button type='submit' onSubmit={handleSubmit(onSubmit)}>
					{isPendingLogin ? <Spinner /> : "Đăng ký"}
				</Button>
			</form>
			<div className='flex justify-start items-center gap-1 !mt-8'>
				<span className='text-sm font-normal text-black/60 leading-4'>
					Đã có tài khoản?
				</span>
				<span
					className='text-sm font-medium leading-4 cursor-pointer hover:underline'
					onClick={handleToggleAuth}>
					Đăng nhập
				</span>
			</div>
		</>
	);
};

export default SignUp;