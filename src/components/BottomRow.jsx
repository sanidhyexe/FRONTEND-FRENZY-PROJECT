import React, { useMemo, useState } from 'react';
import { MdAdd, MdCheck, MdSchedule, MdDelete } from 'react-icons/md';

const BottomRow = ({ tasks, setTasks, searchQuery }) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const toggleTask = (id) => {
        setTasks((previousTasks) => previousTasks.map((task) => (
            task.id === id ? { ...task, completed: !task.completed } : task
        )));
    };

    const deleteTask = (id) => {
        setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            due: 'Pending',
            priority: 'Normal',
            completed: false
        };

        setTasks((previousTasks) => [newTask, ...previousTasks]);
        setNewTaskTitle('');
        setIsAdding(false);
    };

    const filteredTasks = useMemo(() => {
        if (!searchQuery) return tasks;

        return tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [tasks, searchQuery]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold dark:text-white">Weekly Task Checklist</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Keep track of your upcoming deadlines</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 dark:hover:bg-blue-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shadow-sm cursor-pointer"
                >
                    <MdAdd className="text-lg" />
                    {isAdding ? 'Cancel' : 'New Task'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={addTask} className="mb-6 flex gap-3 animate-[fadeIn_0.3s_ease-out]">
                    <input
                        type="text"
                        autoFocus
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white"
                    />
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer text-sm">
                        Save
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        className={`group border ${task.completed ? 'border-slate-100 dark:border-slate-700' : 'border-slate-200 dark:border-slate-600'} p-4 rounded-xl hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/5 transition-all flex items-center justify-between relative`}
                    >
                        <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => toggleTask(task.id)}>
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-blue-500/20 border-blue-500' : 'border-slate-300 dark:border-slate-500 group-hover:border-blue-500'}`}>
                                <MdCheck className={`text-blue-500 text-lg transition-transform ${task.completed ? 'scale-100' : 'scale-0 group-hover:scale-50'}`} />
                            </div>
                            <div>
                                <p className={`text-sm font-bold transition-all ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                                    {task.title}
                                </p>
                                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                    <MdSchedule className="text-[12px]" /> {task.due}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-[10px] font-bold rounded ${task.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                task.priority === 'Normal' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                    'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                                }`}>
                                {task.priority}
                            </span>

                            <button
                                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer p-1 rounded-md"
                                title="Delete task"
                            >
                                <MdDelete className="text-lg" />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredTasks.length === 0 && (
                    <div className="md:col-span-2 lg:col-span-3 p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">No tasks match your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BottomRow;
