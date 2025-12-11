import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchema } from "../lib/validation"
import { useDispatch } from "react-redux"
import { register as registerAction } from "../store/slices/authSlice"
import { useNavigate } from "react-router-dom"

export default function Register(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(authSchema) })

  const onSubmit = async data => {
    try {
      await dispatch(registerAction(data)).unwrap()
      navigate("/")
    } catch(e){
      alert(e.message || "Registration failed")
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="card w-full max-w-md space-y-5">
        <h2 className="text-3xl font-semibold text-center">Create account</h2>

        <div>
          <input {...register("username")} placeholder="Username" className="input" />
          {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
        </div>

        <div>
          <input type="password" {...register("password")} placeholder="Password" className="input" />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <button disabled={isSubmitting} className="btn w-full">Create account</button>
      </form>
    </div>
  )
}
