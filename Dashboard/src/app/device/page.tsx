"use client";
import { useEffect, useState } from 'react';
import DeviceCard from '@/components/DeviceCard';

export default function DevicesPage() {
    const [devices, setDevices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await fetch('http://sardines.thddns.net:7277/device/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch devices');
                }
                const data = await response.json();
                setDevices(data);
                console.log(data)
                setLoading(false);
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

    if (loading) {
        return <p className="text-center dark:bg-gray-900 dark:text-white">Loading...</p>;
    }

    if (error) {
        return <p className="text-center dark:bg-gray-900 text-red-500">{error}</p>;
    }

    return (
        <div className=" min-h-screen p-8 sm:p-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <h1 className="text-center text-4xl font-bold mb-12 text-gray-900 dark:text-white">
                Devices
            </h1>
            <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3'>
                {devices.map((device, index) => (
                    <DeviceCard
                        key={index}
                        deviceID={device.deviceID}
                        name={device.name || 'Unknown Device'}
                        location={device.location || 'Unknown Location'}
                        latitude={device.latitude}
                        longitude={device.longitude}
                        status={device.status || 'Unknown Status'}
                        created={device.created || "Unknow Status"}
                    />
                ))}
            </div>
        </div>
    );
}
