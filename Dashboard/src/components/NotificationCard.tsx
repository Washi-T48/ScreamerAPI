import React from 'react';

interface NotificationCardProps {
    deviceName: string;
    location: string;
    latitude?: number;
    longitude?: number;
    time: string;
    status: "online" | "detected";
}

export default function NotificationCard({
    deviceName,
    location,
    latitude,
    longitude,
    time,
    status,
}: NotificationCardProps) {
    const statusMap = {
        "online": {
            label: "online",
            color: "bg-green-600",
        },
        "detected": {
            label: "detected",
            color: "bg-red-600",
        },
    };

    const currentStatus = statusMap[status] || {
        label: "Unknown",
        color: "bg-gray-400",
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-4 w-full max-w-md mx-auto flex items-start gap-3 transition-colors duration-300">
            <div className="flex-1">
                <div className="flex items-center mb-2">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">{deviceName}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Location: {location}</p>
                {latitude && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Latitude: {latitude}</p>
                )}
                {longitude && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Longitude: {longitude}</p>
                )}
                <p className={`px-2 py-1 mr-24 rounded text-white text-sm font-semibold ${currentStatus.color}`}>
                    Status: {currentStatus.label}
                </p>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{time}</div>
        </div>
    );
}
