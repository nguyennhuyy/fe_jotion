import {
  forgotApi,
  loginApi,
  loginGoogleApi,
  resetPaswordApi,
  signUpApi,
} from "@/apis"
import { useMutation } from "@tanstack/react-query"

import { TypeQuery } from "."

export const useLoginMutation = () =>
  useMutation({
    mutationKey: [TypeQuery.Login],
    mutationFn: loginApi,
  })

export const useSignUpMutation = () =>
  useMutation({
    mutationKey: [TypeQuery.SignUp],
    mutationFn: signUpApi,
  })

export const useLoginGoogleMutation = () =>
  useMutation({
    mutationKey: [TypeQuery.LoginGoogle],
    mutationFn: loginGoogleApi,
  })

export const useForgotMutation = () =>
  useMutation({
    mutationKey: [TypeQuery.ForgotPassword],
    mutationFn: forgotApi,
  })

export const useResetPasswordMutation = () =>
  useMutation({
    mutationKey: [TypeQuery.ResetPassword],
    mutationFn: resetPaswordApi,
  })
