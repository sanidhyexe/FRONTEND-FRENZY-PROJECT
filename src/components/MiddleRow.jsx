import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';
import { MdMoreHoriz, MdNotificationsActive, MdCampaign, MdEvent } from 'react-icons/md';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

const MiddleRow = ({ searchQuery }) => {
    const [selectedRange, setSelectedRange] = useState('Last 4 Semesters');
    const [showAnnouncementActions, setShowAnnouncementActions] = useState(false);
    const [announcements, setAnnouncements] = useState([
        { id: 1, type: 'alert', title: 'Exam Schedule Released', text: 'Final exams starting from June 15th. Check portal for details.', read: false },
        { id: 2, type: 'news', title: 'Guest Lecture Tomorrow', text: 'Speaker from TechCorp sharing insights on AI at 10 AM.', read: false },
        { id: 3, type: 'event', title: 'Campus Workshop', text: 'Soft skills development workshop registration open.', read: false },
    ]);

    const chartConfig = useMemo(() => {
        if (selectedRange === 'All Semesters') {
            return {
                labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
                data: [7.2, 7.5, 7.8, 8.0, 8.2, 8.4],
            };
        }

        return {
            labels: ['Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
            data: [7.8, 8.0, 8.2, 8.4],
        };
    }, [selectedRange]);

    const chartData = {
        labels: chartConfig.labels,
        datasets: [
            {
                fill: true,
                label: 'CGPA Trend',
                data: chartConfig.data,
                borderColor: '#3c83f6',
                backgroundColor: 'rgba(60, 131, 246, 0.2)',
                tension: 0.4,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#3c83f6',
                pointBorderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { family: 'Lexend', size: 13 },
                bodyFont: { family: 'Lexend', size: 13 },
                displayColors: false,
            }
        },
        scales: {
            y: {
                min: 7.0,
                max: 10.0,
                grid: { color: 'rgba(148, 163, 184, 0.1)', drawBorder: false },
                ticks: { font: { family: 'Lexend' }, color: '#94a3b8' }
            },
            x: {
                grid: { display: false, drawBorder: false },
                ticks: { font: { family: 'Lexend' }, color: '#94a3b8' }
            }
        },
    };

    const filteredAnnouncements = announcements.filter((announcement) => {
        if (!searchQuery) return true;

        const searchableText = `${announcement.title} ${announcement.text}`.toLowerCase();
        return searchableText.includes(searchQuery.toLowerCase());
    });

    const markAllAsRead = () => {
        setAnnouncements((previousAnnouncements) => previousAnnouncements.map((announcement) => ({ ...announcement, read: true })));
        setShowAnnouncementActions(false);
    };

    const clearReadAnnouncements = () => {
        setAnnouncements((previousAnnouncements) => previousAnnouncements.filter((announcement) => !announcement.read));
        setShowAnnouncementActions(false);
    };

    const markAsRead = (announcementId) => {
        setAnnouncements((previousAnnouncements) => previousAnnouncements.map((announcement) => (
            announcement.id === announcementId ? { ...announcement, read: true } : announcement
        )));
    };

    return (
        <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Academic Trends Chart */}
            <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold dark:text-white">Academic Performance</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Semester-wise CGPA progression</p>
                    </div>
                    <select
                        value={selectedRange}
                        onChange={(event) => setSelectedRange(event.target.value)}
                        className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/30 dark:text-white cursor-pointer transition-all"
                    >
                        <option>Last 4 Semesters</option>
                        <option>All Semesters</option>
                    </select>
                </div>
                <div className="relative h-[240px] w-full">
                    <Line options={chartOptions} data={chartData} />
                </div>
            </div>

            {/* Announcements Panel */}
            <div className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold dark:text-white">Announcements</h3>
                    <div className="relative">
                        <button
                            onClick={() => setShowAnnouncementActions((previousState) => !previousState)}
                            className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-sm"
                        >
                            <MdMoreHoriz className="text-2xl" />
                        </button>

                        {showAnnouncementActions && (
                            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-1 z-20">
                                <button
                                    onClick={markAllAsRead}
                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Mark all as read
                                </button>
                                <button
                                    onClick={clearReadAnnouncements}
                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Clear read
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto max-h-[260px] pr-2 custom-scrollbar">
                    {filteredAnnouncements.map((announcement) => {
                        const isPrimary = announcement.type === 'alert';
                        const Icon = announcement.type === 'alert' ? MdNotificationsActive : announcement.type === 'news' ? MdCampaign : MdEvent;

                        return (
                            <div
                                key={announcement.id}
                                className={`p-4 rounded-xl flex gap-4 border-l-4 transition-colors cursor-pointer ${isPrimary
                                    ? 'bg-blue-50 dark:bg-blue-500/10 border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500/20'
                                    : 'bg-slate-50 dark:bg-slate-700/50 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    } ${announcement.read ? 'opacity-60' : ''}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isPrimary
                                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                    : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                                    }`}>
                                    <Icon className="text-xl" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold dark:text-slate-200">{announcement.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{announcement.text}</p>
                                    {!announcement.read && (
                                        <button
                                            onClick={() => markAsRead(announcement.id)}
                                            className="mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {filteredAnnouncements.length === 0 && (
                        <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-center">
                            <p className="text-xs text-slate-500 dark:text-slate-400">No announcements match your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MiddleRow;
