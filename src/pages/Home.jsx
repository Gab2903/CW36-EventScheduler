import { useEffect } from "react";
import EventsList from "../components/EventsList";

const Home = () => {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEvents = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/api/events/", {
          signal,
        });
        const data = await res.json();

        if (data.results) {
          localStorage.setItem("events", JSON.stringify(data.results));
        }

        console.log(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.error(error);
        }
      }
    };

    fetchEvents();

    return () => {
      controller.abort();
    };
  }, []);

  return <EventsList />;
};

export default Home;
