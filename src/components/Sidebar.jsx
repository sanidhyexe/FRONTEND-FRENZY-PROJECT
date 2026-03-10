import React from 'react';
import { MdDashboard, MdMenuBook, MdAssignment, MdEventAvailable, MdChatBubble, MdDarkMode, MdLightMode, MdSchool, MdPerson, MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Sidebar = ({ darkMode, toggleDarkMode, activeTab, setActiveTab, isExpanded, toggleExpanded }) => {

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
        { id: 'courses', label: 'Courses', icon: MdMenuBook },
        { id: 'assignments', label: 'Assignments', icon: MdAssignment },
        { id: 'attendance', label: 'Attendance', icon: MdEventAvailable },
        { id: 'messages', label: 'Messages', icon: MdChatBubble },
        { id: 'profile', label: 'Profile', icon: MdPerson },
    ];

    return (
        <aside className={`glass-sidebar flex flex-col fixed h-full z-20 transition-all duration-300 ${isExpanded ? 'w-72' : 'w-24'}`}>
            <div className={`flex flex-col h-full ${isExpanded ? 'p-8' : 'p-4'}`}>
                {/* Logo */}
                <div className={`flex items-center mb-8 ${isExpanded ? 'justify-between' : 'justify-center'}`}>
                    <div className={`flex items-center ${isExpanded ? 'gap-3' : ''}`}>
                    <div className="bg-blue-500 p-2 rounded-lg text-white">
                        <MdSchool className="text-2xl" />
                    </div>
                    {isExpanded && (
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">EduTrack</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Premium Student Portal</p>
                        </div>
                    )}
                    </div>

                    {isExpanded && (
                        <button
                            onClick={toggleExpanded}
                            className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                            title="Collapse Sidebar"
                        >
                            <MdChevronLeft className="text-xl text-slate-700 dark:text-slate-200" />
                        </button>
                    )}
                </div>

                {!isExpanded && (
                    <button
                        onClick={toggleExpanded}
                        className="mb-6 self-center w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                        title="Expand Sidebar"
                    >
                        <MdChevronRight className="text-xl text-slate-700 dark:text-slate-200" />
                    </button>
                )}

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center py-3 rounded-xl transition-all cursor-pointer ${isExpanded ? 'px-4 gap-4 justify-start' : 'px-0 justify-center'} ${isActive
                                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-blue-500/10 hover:text-blue-500 hover:shadow-md'
                                    }`}
                                title={item.label}
                            >
                                <Icon className="text-xl" />
                                {isExpanded && <span className="font-medium">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* Theme Toggle */}
                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={toggleDarkMode}
                        className={`w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all duration-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex items-center ${isExpanded ? 'px-4 justify-between' : 'px-0 justify-center'}`}
                        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isExpanded && (
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </span>
                        )}
                        {darkMode ? (
                            <MdLightMode className="text-yellow-500 text-xl" />
                        ) : (
                            <MdDarkMode className="text-slate-600 text-xl" />
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
