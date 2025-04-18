import { useState, useEffect } from "react";

export default function BusinessHours() {
  const [hours, setHours] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Day of week mapping
  const daysOfWeek = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  // Format time from API (in 24h format) to 12h format
  const formatTime = (time) => {
    if (!time) return "Closed";

    const hour = parseInt(time.hours || 0, 10);
    const minute = parseInt(time.minutes || 0, 10);

    // Convert to 12-hour format
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute.toString().padStart(2, "0");

    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  useEffect(() => {
    async function fetchBusinessHours() {
      try {
        setLoading(true);
        const response = await fetch("/api/business-hours");

        if (!response.ok) {
          throw new Error("Failed to fetch business hours 2");
        }

        const data = await response.json();
        setHours(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchBusinessHours();
  }, []);

  if (loading)
    return <div className="text-center py-4">Loading business hours...</div>;
  if (error) return <div className="text-red-500 py-4">Error: {error}</div>;
  if (!hours || !hours.periods)
    return <div className="py-4">No business hours available</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Business Hours</h2>

      <div className="space-y-2">
        {hours.periods.map((period, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-1 border-b border-gray-100"
          >
            <span className="font-medium">{daysOfWeek[period.openDay]}</span>
            <span>
              {period.openTime && period.closeTime
                ? `${formatTime(period.openTime)} - ${formatTime(period.closeTime)}`
                : "Closed"}
            </span>
          </div>
        ))}
      </div>

      {/* Special hours notice if applicable */}
      {hours.specialHours && hours.specialHours.length > 0 && (
        <div className="mt-4 text-sm text-orange-600">
          * Special hours may apply on holidays and special events
        </div>
      )}
    </div>
  );
}
