import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PostStuff = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  // Erfolgsmessage
  const [successMessage, setSuccessMessage] = useState("");

  // Wir brauchen den user und holen ihn uns aus dem Context.
  const { user } = useContext(AuthContext);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Viele typischen Elemente einer submit/fetch-Funktion fehlen hier noch. Vor allem Checks nach möglichen Fehlern, Ladezustand und User-Feedback bei Errors.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Beim geschützten Enpunkt müssen wir das token so mitschicken
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // Füge dem Inhalt der Nachricht (body) den Inhalt der Form und die id des eingeloggten Users hinzu.
        body: JSON.stringify({ ...formData, organizerId: user.id }),
      });

      if (res.ok) {
        // Erfolgreich zugefügt -> leere das Formular
        setFormData({
          title: "",
          description: "",
          date: "",
          location: "",
        });
        // Erfolgsmeldung anzeigen
        setSuccessMessage("☑️ Event added successfully");
        // Entferne Erfoldmelung nach xxxx(msec).
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="my-2 p-2">Create a Event 🥳</h1>
      <form
        onSubmit={handleSubmit}
        className="grid max-w-96 gap-4 mx-auto font-semibold"
      >
        <input
          id="title"
          required
          type="text"
          name="title"
          placeholder="title"
          className="input input-bordered capitalize hover:border-[#535bf2]"
          value={formData.title}
          onChange={handleChange}
        />{" "}
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          id="description"
          required
          type="text"
          name="description"
          placeholder="description"
          className="input input-bordered capitalize hover:border-[#535bf2]"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <input
          id="date"
          required
          type="date"
          name="date"
          placeholder="date"
          className="input input-bordered uppercase hover:border-[#535bf2]"
          value={formData.date}
          onChange={handleChange}
        />
        <label htmlFor="date" className="sr-only">
          Date
        </label>
        <input
          id="location"
          required
          type="text"
          name="location"
          placeholder="location"
          className="input input-bordered capitalize hover:border-[#535bf2]"
          value={formData.location}
          onChange={handleChange}
        />
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <br />
        <button className="font-bold hover:shadow-md hover:shadow-[#535bf2]">
          Add to event calender
        </button>
      </form>
      {/* Erfolgsmeldung anzeigen */}
      {successMessage && (
        <div className="mt-4 text-[#646cff] font-bold">{successMessage}</div>
        // <div role="alert" className="alert alert-success">
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     className="h-6 w-6 shrink-0 stroke-current"
        //     fill="none"
        //     viewBox="0 0 24 24"
        //   >
        //     <path
        //       strokeLinecap="round"
        //       strokeLinejoin="round"
        //       strokeWidth="2"
        //       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        //     />
        //   </svg>
        //   <span>{successMessage}</span>
        // </div>
      )}
    </div>
  );
};

export default PostStuff;
