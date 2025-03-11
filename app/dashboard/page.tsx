"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddTask from "../components/AddTask";
import TodoList from "../components/TodoList";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null); // Allow both string and null
  const [username, setUsername] = useState<string | null>(null); // Allow both string and null

  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    if (!storedUserId) {
      router.push("/signin"); // Redirect to login if user is not found
      return;
    }
    
    setUserId(storedUserId); // Set the userId from localStorage
    setUsername(storedUsername); // Set the userId from localStorage
    fetchTasks(storedUserId); // Ensure we're passing a string userId
  }, []);

  const fetchTasks = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/user/${id}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const tasks = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove userId from storage
    router.push("/signin"); // Redirect to login
  };

  // Ensure userId is a string before passing it to functions like fetchTasks
  if (isLoading) return <p>Loading...</p>;
  if (!tasks) return <p>No tasks available.</p>;

  return (
    <main className="max-w-6xl mx-auto mt-10 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="text-center my-4">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Todo List App</h1>
          <p className="text-lg text-gray-500">Welcome, <strong className="text-indigo-600"> {username}</strong></p>
        </div>
        
        <div className="flex justify-between items-center my-4">
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <AddTask fetchTasks={() => userId && fetchTasks(userId)} />
        </div>

        <div className="mt-8">
          <TodoList tasks={tasks} fetchTasks={() => userId && fetchTasks(userId)} />
        </div>
      </div>
    </main>
  );
}
