import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taskSchema } from "../lib/validation"

export default function TaskForm({ onSubmit, initial = { title: "", description: "", status: "pending" }, onCancel }){
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: initial
  })

  const submit = async data => {
    await onSubmit(data)
    if (!onCancel) reset()
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="card space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input {...register("title")} placeholder="Task title" className="input flex-1" />
        <select {...register("status")} className="input w-full sm:w-40">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <textarea {...register("description")} placeholder="Description (optional)" className="input h-28" />

      <div className="flex gap-3 justify-end">
        <button type="submit" className="btn">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="btn bg-slate-200 text-slate-800">Cancel</button>}
      </div>
    </form>
  )
}
