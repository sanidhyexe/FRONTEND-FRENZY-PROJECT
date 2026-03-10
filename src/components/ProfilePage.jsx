import React, { useState } from 'react';

const ProfilePage = ({ profile, onSaveProfile }) => {
    const [formData, setFormData] = useState(profile);
    const [saveMessage, setSaveMessage] = useState('');

    const handleChange = (field) => (event) => {
        setFormData((previous) => ({
            ...previous,
            [field]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSaveProfile(formData);
        setSaveMessage('Profile updated successfully.');

        window.setTimeout(() => {
            setSaveMessage('');
        }, 1800);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-xl font-bold dark:text-white">Profile Settings</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your personal information shown across the app.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                    <input
                        value={formData.name}
                        onChange={handleChange('name')}
                        type="text"
                        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3.5 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                    <input
                        value={formData.email}
                        onChange={handleChange('email')}
                        type="email"
                        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3.5 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
                    <input
                        value={formData.phone}
                        onChange={handleChange('phone')}
                        type="text"
                        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3.5 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Semester</label>
                    <input
                        value={formData.semester}
                        onChange={handleChange('semester')}
                        type="text"
                        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3.5 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Department</label>
                    <input
                        value={formData.department}
                        onChange={handleChange('department')}
                        type="text"
                        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3.5 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">About</label>
                    <textarea
                        value={formData.about}
                        onChange={handleChange('about')}
                        rows={4}
                        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3.5 py-2.5 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none"
                    />
                </div>

                <div className="md:col-span-2 flex items-center justify-between mt-2">
                    {saveMessage ? (
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">{saveMessage}</p>
                    ) : (
                        <span />
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;
