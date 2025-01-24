import React from 'react';
import { Star } from 'lucide-react';
import { Task } from '../types';

interface AllTasksProps {
  tasks: Task[];
  darkMode: boolean;
  toggleTaskCompletion: (id: number) => void;
  toggleImportant: (id: number) => void;
  setSelectedTask: (id: number | null) => void;
  selectedTask: number | null;
}

function AllTasks({ 
  tasks, 
  darkMode, 
  toggleTaskCompletion, 
  toggleImportant, 
  setSelectedTask,
  selectedTask 
}: AllTasksProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return b.important ? 1 : -1;
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">All Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
        {sortedTasks.map(task => (
          <div 
            key={task.id} 
            className={`p-4 rounded-lg flex items-center justify-between cursor-pointer ${
              darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            } ${selectedTask === task.id ? 'ring-1 ring-green-500' : ''}`}
            onClick={() => setSelectedTask(task.id)}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleTaskCompletion(task.id);
                }}
                className="w-5 h-5 rounded-sm border-2 border-gray-300 checked:bg-green-600"
              />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleImportant(task.id);
              }}
              className={`${task.important ? 'text-yellow-500' : ''} hover:text-yellow-500`}
            >
              <Star className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTasks;