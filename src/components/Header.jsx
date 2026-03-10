import React, { useEffect, useRef, useState } from 'react';
import { MdSearch, MdNotifications } from 'react-icons/md';

const Header = ({ userName, onLogout, onOpenProfile, onNavigateTab, searchQuery, setSearchQuery }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [actionFeedback, setActionFeedback] = useState('');
    const notificationsRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleProfileAction = (actionLabel) => {
        if (actionLabel === 'View Profile') {
            onOpenProfile();
            setShowProfileMenu(false);
            return;
        }

        if (actionLabel === 'Logout') {
            onLogout();
            return;
        }

        setActionFeedback(`${actionLabel} clicked`);
        setShowProfileMenu(false);

        window.setTimeout(() => {
            setActionFeedback('');
        }, 1800);
    };

    return (
        <header className="relative flex items-center justify-between mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {userName.split(' ')[0]}!</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening with your studies today.</p>
            </div>

            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="relative w-64">
                    <div className="relative group flex items-center">
                        <MdSearch className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors text-xl" />
                        <input
                            value={searchQuery}
                            onFocus={() => setShowSearchDropdown(true)}
                            onBlur={() => {
                                window.setTimeout(() => {
                                    setShowSearchDropdown(false);
                                }, 120);
                            }}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            className="bg-white dark:bg-slate-800 border border-transparent rounded-xl pl-10 pr-4 py-2.5 w-64 shadow-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-sm outline-none transition-all dark:text-white"
                            placeholder="Search tasks..."
                            type="text"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold px-1.5 py-0.5 rounded transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {showSearchDropdown && (
                        <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-2 z-50">
                            <button
                                onClick={() => onNavigateTab('dashboard')}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                Search in Dashboard Tasks
                            </button>
                            <button
                                onClick={() => onNavigateTab('courses')}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                Open Courses
                            </button>
                            <button
                                onClick={() => onNavigateTab('assignments')}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                Open Assignments
                            </button>
                            <button
                                onClick={() => onNavigateTab('attendance')}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                Open Attendance
                            </button>
                            <button
                                onClick={() => onNavigateTab('messages')}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                Open Messages
                            </button>
                            <button
                                onClick={onOpenProfile}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                Open Profile
                            </button>
                        </div>
                    )}
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                    <button
                        onClick={() => {
                            setShowNotifications((previousState) => !previousState);
                            setShowProfileMenu(false);
                        }}
                        className="relative p-2.5 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-500 dark:hover:text-blue-400 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md shadow-sm cursor-pointer border border-transparent dark:hover:border-slate-600"
                    >
                        <MdNotifications className="text-xl" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-3 z-50">
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Notifications</p>
                            <div className="space-y-2">
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">New assignment posted</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Database Lab - due in 2 days</p>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Attendance updated</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Networks attendance is now 86%</p>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">Reminder</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Quiz starts tomorrow at 9:00 AM</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => {
                            setShowProfileMenu((previousState) => !previousState);
                            setShowNotifications(false);
                        }}
                        className="flex items-center gap-3 bg-white dark:bg-slate-800 p-1.5 pr-4 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                alt="Male student profile portrait"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7CXHFWYPe4dbQ50XVgayc-XZfi5WMQrehPi1G1mX2FJVOFRRKVvItQrW4ZNx7twcaEpVoNQhJ0Yq2je218yWn1ZyWfPZhNAAtPG64h7eFp_ls366nib9Y7ax5f2pDMNhQ84fJOF3C9z2dvJJAbehs0Kb0zZO12x8K9BLwSbOZhLB5bxtkeykqqOgYuRKC54E7RnCJAC9ywXGLyPu4U3oClUuUm0OMbP5AUVBp1Xcgcmz_hU1ym3EoaWAWEJHWCXE0NfDBG1yk6U4"
                            />
                        </div>
                        <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{userName}</span>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-2 z-50">
                            <button
                                onClick={() => handleProfileAction('View Profile')}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                View Profile
                            </button>
                            <button
                                onClick={() => handleProfileAction('Settings')}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                Settings
                            </button>
                            <button
                                onClick={() => handleProfileAction('Logout')}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {actionFeedback && (
                <div className="absolute right-0 top-full mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900/40">
                    {actionFeedback}
                </div>
            )}
        </header>
    );
};

export default Header;
