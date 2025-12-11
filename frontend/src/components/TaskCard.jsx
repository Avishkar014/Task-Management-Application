import React from "react"

export default function TaskCard({ task, onEdit, onDelete, onToggle }){
  const id = task._id || task.id

  return (
    <div className="card flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm mt-1 text-slate-600">{task.description}</p>
            <div className="mt-3 text-xs text-slate-500">ID: {id}</div>
          </div>

          <div className="text-right">
            <span className={(task.status === "completed") ? "px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700" : "px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800"}>
              {task.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={() => onToggle(id)} className="btn">Toggle</button>
        <button onClick={() => onEdit(task)} className="btn bg-slate-100 text-slate-900">Edit</button>
        <button onClick={() => onDelete(id)} className="btn bg-red-600">Delete</button>
      </div>
    </div>
  )
}
