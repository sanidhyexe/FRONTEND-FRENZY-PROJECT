import React, { useState } from 'react';
import { MdListAlt } from 'react-icons/md';

const TopRow = ({ pendingTasks, profile }) => {
    const [isActive, setIsActive] = useState(true);

    const attendance = 85;
    const gpa = 8.4;

    return (
        <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Profile Card */}
            <div className="col-span-12 lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                <div className="w-24 h-24 rounded-full border-4 border-blue-500/20 p-1 group-hover:border-blue-500/40 transition-colors">
                    <img
                        className="w-full h-full object-cover rounded-full"
                        alt="Student avatar circular"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvL8lOTRu0_K_bf_prPJ8U7fF91D3ztGvMyeXBtfFii_9ngBKqCEviYjR9RjUUD9jyWBLKz7KwQjVV7XCyNC8UqfAjWhHJtMcO3-wbMg4jsCuCcyLKaUuJXryg74uODTFN0bSzvcQJnLDvI5le8ame6wyfeb2BFQHspgjRCaPY4yYI9_qRnY1WGBRKzDcnKuE0tz2hPNon1NNC1Kv8zCj197F3kA3HC71JMfkfzz1N4AWT8Fweff_UHp1fhcuZW7sFwEK-ophcaUU"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold dark:text-white">{profile.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{profile.department} - {profile.semester}</p>
                    <div className="mt-4 flex gap-2">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">ID: 20240985</span>
                        <button
                            onClick={() => setIsActive((previousState) => !previousState)}
                            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider transition-colors ${isActive
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                                }`}
                        >
                            {isActive ? 'Active' : 'Inactive'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="col-span-12 lg:col-span-7 grid grid-cols-3 gap-6">

                {/* Attendance */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border-b-4 border-blue-500 hover:-translate-y-1 transition-transform">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Attendance</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-3xl font-bold dark:text-white">{attendance}%</h4>
                        <div className="w-10 h-10 relative flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                                <path className="text-blue-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray={`${attendance}, 100`} strokeLinecap="round" strokeWidth="4"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* GPA */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border-b-4 border-indigo-500 hover:-translate-y-1 transition-transform">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Current GPA</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-3xl font-bold dark:text-white">{gpa.toFixed(1)}</h4>
                        <div className="flex gap-1 items-end h-8">
                            <div className="w-1.5 bg-indigo-200 dark:bg-indigo-900 h-3 rounded-t-sm"></div>
                            <div className="w-1.5 bg-indigo-300 dark:bg-indigo-800 h-5 rounded-t-sm"></div>
                            <div className="w-1.5 bg-indigo-400 dark:bg-indigo-600 h-7 rounded-t-sm"></div>
                            <div className="w-1.5 bg-indigo-500 h-6 rounded-t-sm"></div>
                        </div>
                    </div>
                </div>

                {/* Pending Tasks */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border-b-4 border-amber-500 hover:-translate-y-1 transition-transform">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Pending Tasks</p>
                    <div className="flex items-end justify-between">
                        <h4 className="text-3xl font-bold dark:text-white">{String(pendingTasks).padStart(2, '0')}</h4>
                        <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                            <MdListAlt className="text-2xl" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TopRow;
