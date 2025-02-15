"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="space-y-4 w-full">
      <h2 className="text-2xl font-semibold text-center">Tasks</h2>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          className="flex-grow"
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      <ul className="space-y-2 max-h-[50vh] overflow-y-auto">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center space-x-2 bg-secondary/50 p-2 rounded"
          >
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
            />
            <label
              htmlFor={`task-${task.id}`}
              className={`flex-grow ${
                task.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {task.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
