import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTasks, createTask, updateTask, deleteTask } from "../store/slices/tasksSlice"
import TaskCard from "../components/TaskCard"
import TaskForm from "../components/TaskForm"

export default function Tasks(){
  const dispatch = useDispatch()
  const tasks = useSelector(s => s.tasks.items || [])
  const [editing, setEditing] = useState(null)

  useEffect(() => { dispatch(fetchTasks()) }, [dispatch])

  const onCreate = async data => { await dispatch(createTask(data)) }
  const onUpdate = async (id, data) => { await dispatch(updateTask({ id, data })); setEditing(null) }
  const onDelete = async id => { if (confirm("Delete task?")) await dispatch(deleteTask(id)) }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your tasks</h1>
        <div className="text-sm text-slate-500">Manage tasks you created</div>
      </div>

      <TaskForm onSubmit={onCreate} />

      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map(t => (
          <TaskCard
            key={t._id || t.id}
            task={t}
            onEdit={() => setEditing(t)}
            onDelete={() => onDelete(t._id || t.id)}
            onToggle={() => onUpdate(t._id || t.id, { status: t.status === "pending" ? "completed" : "pending" })}
          />
        ))}
      </div>

      {editing && (
        <div className="card">
          <h3 className="font-semibold mb-3">Edit task</h3>
          <TaskForm initial={editing} onSubmit={data => onUpdate(editing._id || editing.id, data)} onCancel={() => setEditing(null)} />
        </div>
      )}
    </div>
  )
}
