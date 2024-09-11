import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import PostStuff from "./pages/PostStuff";
import ProtectedLayout from "./layouts/ProtectedLayout";
import EventDetails from "./pages/EventDetails"; // Import the EventDetails component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="event-details/:eventId" element={<EventDetails />} />{" "}
      <Route path="user" element={<ProtectedLayout />}>
        <Route path="post-stuff" element={<PostStuff />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
