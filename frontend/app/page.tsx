'use client';

import { useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from "next/navigation";
import api from "../lib/axios";
import axiosInstance from '../lib/axios';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Pending" | "Completed";
}

export default function HomePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  // New State for Add Task Form
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newStatus, setNewStatus] = useState<"Pending" | "Completed">("Pending");

  const getTasks = async () => {
    if (!user) return;
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    try {
      const res = await api.get('/tasks', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getTasks();
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading && !user) {
      setIsRedirecting(true);
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || isRedirecting) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const handleLogout = () => {
    router.push("/auth/logout");
  };

  const handleTaskClick = (id: string) => {
    router.push(`/task/${id}`);
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      alert("Title and Description are required");
      return;
    }

    try {
      await api.post('/tasks', {
        title: newTitle,
        description: newDescription,
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      // After adding a task, fetch the updated task list
      await getTasks();

      // Clear form fields
      setNewTitle("");
      setNewDescription("");
      setNewStatus("Pending");
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex-1 text-center font-semibold text-xl">
          {user ? `Welcome, ${user.name}` : "Welcome"}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </nav>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

        <div className="grid gap-4 mb-8">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} onClick={() => handleTaskClick(task._id)} className="p-4 bg-white rounded shadow cursor-pointer">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="mt-2 text-sm">
                  Status:{" "}
                  <span className={task.status === "Completed" ? "text-green-600" : "text-yellow-600"}>
                    {task.status}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <div>No tasks found.</div>
          )}
        </div>

        {/* Add New Task Form */}
        <form onSubmit={handleAddTask} className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>

          <div>
            <input
              type="text"
              placeholder="Task Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Task Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as "Pending" | "Completed")}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
