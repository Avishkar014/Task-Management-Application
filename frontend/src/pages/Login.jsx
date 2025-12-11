import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authSchema } from "../lib/validation"
import { useDispatch } from "react-redux"
import { login } from "../store/slices/authSlice"
import { useNavigate, Link } from "react-router-dom"

export default function Login(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(authSchema) })

  const onSubmit = async data => {
    try {
      await dispatch(login(data)).unwrap()
      navigate("/")
    } catch(e){
      alert(e.message || "Login failed")
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass">
          <div className="flex items-center gap-4 mb-6">
            <div className="brand-badge text-lg">TM</div>
            <div>
              <h1 className="text-xl font-semibold">Welcome back</h1>
              <p className="text-sm text-slate-500">Sign in to manage your tasks</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">Username</label>
              <input
                {...register("username")}
                placeholder="your.username"
                className="input"
                autoComplete="username"
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-2">{errors.username.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link to="/forgot" className="text-xs text-slate-500 hover:underline">Forgot?</Link>
              </div>

              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="input pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 p-2 rounded-md hover:bg-slate-100"
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="text-xs text-red-500 mt-2">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-slate-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                  {...register("remember")}
                />
                <span>Remember me</span>
              </label>
              <div className="text-xs text-slate-400">Secure on this device</div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn flex items-center justify-center gap-3"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-slate-700 font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
