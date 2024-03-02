import { useMutation } from "@tanstack/react-query";

import { loginApi, loginGoogleApi, signUpApi } from "@/apis";
import { TypeQuery } from ".";

export const useLoginMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.Login],
		mutationFn: loginApi
	});

export const useSignUpMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.SignUp],
		mutationFn: signUpApi
	});

export const useLoginGoogleMutation = () =>
	useMutation({
		mutationKey: [TypeQuery.LoginGoogle],
		mutationFn: loginGoogleApi
	});
