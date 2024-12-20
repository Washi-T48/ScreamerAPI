import React from 'react';

interface DeviceCardProps {
    deviceID: string;
    name: string;
    location: string;
    latitude?: number;
    longitude?: number;
    status: string;
    created: string;
}

export default function DeviceCard({
    deviceID,
    name,
    location,
    latitude,
    longitude,
    status,
    created,
}: DeviceCardProps) {
    const statusMap = {
        "online": {
            label: "Online",
            color: "bg-green-600",
        },
        "offline": {
            label: "Offline",
            color: "bg-gray-500",
        },
        "detected": {
            label: "Detected",
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
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Device ID: {deviceID}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Location: {location}</p>
                {latitude && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Latitude: {latitude}</p>
                )}
                {longitude && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">Longitude: {longitude}</p>
                )}
                <p className={`px-2 py-1 mr-12 rounded text-white text-sm font-semibold ${currentStatus.color}`}>
                    Status: {currentStatus.label}
                </p>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">Created: {new Date(created).toLocaleString()}</div>
        </div>
    );
}
