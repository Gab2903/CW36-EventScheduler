import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const sortedEvents = events.sort(
      (b, a) => new Date(b.date) - new Date(a.date)
    );
    setEvents(sortedEvents);
  }, []);

  const handleCardClick = (event) => {
    navigate(`/event-details/${event.id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 text-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center cursor-pointer"
            onClick={() => handleCardClick(event)}
          >
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-gray-300">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
