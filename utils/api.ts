"use client"
import { IUser } from "@/types/user";
import { ITask } from "../types/tasks";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/tasks";
const API_URL_USER ="http://localhost:8080/api/users";


// user api

// register user
// export const CreateUser = async (user: IUser): Promise<IUser> => {
//   const res = await fetch(`${API_URL_USER}/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(user)
//   })
//   const newUser = await res.json();
//   return newUser;
// }




// 🔹 Register User
export const registerUser = async (user: IUser): Promise<IUser> => {
  const res = await fetch(`${API_URL_USER}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }
  
  return res.json();
};

export const loginUser = async (username: string, password: string) => {
  const res = await fetch(`${API_URL_USER}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  
    body: JSON.stringify({ username, password }),
    credentials: "include" // 🔹 Required for session authentication
    
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  const data = await res.json();
  localStorage.setItem("userId", data.userId); // Store userId in localStorage
  localStorage.setItem("username", data.username); // Store userId in localStorage

  return data;
};


// get user
export const getuser = async (): Promise<IUser[]> => {
  const res = await fetch(`${API_URL_USER}/10`, { cache: 'no-store' });
  const user = await res.json();
  return user;
}




// task api

// get all task of user
export const getAllTodos = async ()=> {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
   
  useEffect(() => {
    fetch('http://localhost:8080/api/tasks/user/1', {
      credentials: 'include', })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
    // if (isLoading) return <p>Loading...</p>
  // if (!data) return <p>No profile data</p>
}

// add task
export const addTodo = async (todo: Omit<ITask, "id">): Promise<ITask> => {

  const userId = localStorage.getItem("userId");
  const res = await fetch(`${API_URL}/user/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify(todo)
  })
  const newTodo = await res.json();
  return newTodo;
}

// edit task
export const editTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include",
    body: JSON.stringify(todo)
  })
  const updatedTodo = await res.json();
  return updatedTodo;
}

// delete task
export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: "include",
  })
}

