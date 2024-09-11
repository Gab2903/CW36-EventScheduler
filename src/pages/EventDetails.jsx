import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + `/api/events/${eventId}`
        );
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto p-8 sm:p-10 md:p-12 lg:p-16 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{event.title}</h1>
      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Location:</strong> {event.location}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Organizer ID:</strong> {event.organizerId}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Created At:</strong>{" "}
          {new Date(event.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Updated At:</strong>{" "}
          {new Date(event.updatedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Latitude:</strong> {event.latitude}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Longitude:</strong> {event.longitude}
        </p>
      </div>
      <p className="text-gray-800">{event.description}</p>
    </div>
  );
};

export default EventDetails;
