"use client";
import { useEffect, useState } from 'react';
import NotificationCard from '@/components/NotificationCard';

export default function Home() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [deviceInfoCache, setDeviceInfoCache] = useState<Map<string, any>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://sardines.thddns.net:7277/report/detected');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setNotifications(data);
        await fetchDeviceInfoForNotifications(data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    const fetchDeviceInfoForNotifications = async (notifications: any[]) => {
      const deviceIDs = notifications.map((notification) => notification.deviceID);
      const uniqueDeviceIDs = [...new Set(deviceIDs)];

      const newDeviceInfoCache: Map<string, any> = new Map();

      for (const deviceID of uniqueDeviceIDs) {
        const deviceInfo = await fetchDeviceInfo(deviceID);
        if (deviceInfo) {
          newDeviceInfoCache.set(deviceID, deviceInfo);
        }
      }

      setDeviceInfoCache(newDeviceInfoCache);
    };

    fetchNotifications();
  }, []);

  const fetchDeviceInfo = async (deviceID: string) => {
    try {
      const response = await fetch(`http://sardines.thddns.net:7277/device/info/${deviceID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch device info');
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Error fetching device info:', error);
      return null;
    }
  };

  if (loading) {
    return <p className="text-center dark:bg-gray-900 dark:text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-center dark:bg-gray-900 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen p-8 sm:p-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-center text-4xl font-bold mb-12 text-gray-900 dark:text-white">
        Notifications
      </h1>
      <div>
        {notifications.map((notification, index) => {
          const { deviceID, time, status } = notification;
          const deviceInfo = deviceInfoCache.get(deviceID);

          return (
            <NotificationCard
              key={index}
              deviceName={deviceInfo?.name || 'Unknown Device'}
              location={deviceInfo?.location || 'Unknown Location'}
              latitude={deviceInfo?.latitude}
              longitude={deviceInfo?.longitude}
              time={new Date(time).toLocaleString()}
              status={status}
            />
          );
        })}
      </div>
    </div>
  );
}
