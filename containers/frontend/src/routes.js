import { Navigate } from "react-router-dom";
import NotFound from "src/pages/NotFound";

// Public Facing pages
import PublicFacingAbout from "src/pages/publicFacing/PublicFacingAbout";
import Home from "src/pages/publicFacing/Home"
import Projects from "src/pages/publicFacing/Projects";
import StoryPage from "src/pages/publicFacing/StoryPage";
import PublicFacingStoryList from "src/pages/publicFacing/PublicFacingStoryList";
import AnimationList from "src/pages/publicFacing/AnimationList";
import AnimationGrid from "src/pages/publicFacing/AnimationGrid";
import PublicLayout from "./components/publicFacing/layout/PublicLayout";
import ContactPage from "./pages/publicFacing/ContactPage";

// Admin pages
import DashboardLayout from "src/components/admin/layout/DashboardLayout";
import Login from "src/pages/admin/Login";
import About from "src/pages/admin/About";
import EditHome from "src/pages/admin/EditHome";
import EditAboutUs from "src/pages/admin/EditAboutUs";
import StoryList from "src/pages/admin/StoryList";
import AddEditStory from "src/pages/admin/AddEditStory";
import WebAnimation from "src/pages/admin/WebAnimation";

const routes = [
  { path: "/", element: <Navigate to="/home" /> },
  { path: "*", element: <Navigate to="/404" /> },
  { path: "login", element: <Login /> },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "home", element: <Home /> },
      {
        path: "glassFlowers",
        element: <Projects resourceType={"Glass Flowers"} />,
      },
      {
        path: "missingMezzuzot",
        element: <Projects resourceType={"Missing Mezzuzot"} />,
      },
      // {
      //   path: "flowerStory/list",
      //   element: <PublicFacingStoryList resourceType={"Flowers"} />,
      // },
      // {
      //   path: "mezzuzahStory/list",
      //   element: <PublicFacingStoryList resourceType={"Mezzuzot"} />,
      // },
      { path: "animations/:id", element: <AnimationList /> },
      { path: "animations", element: <AnimationGrid /> },
      { path: "About", element: <PublicFacingAbout resourceType={"Glass Flowers"} />,},
      { path: "contact", element: <ContactPage /> },
      { path: "404", element: <NotFound /> },
      {
        path: "flowerStory/:id",
        element: (
          <StoryPage resourceType={"Flowers"} resourceTypeSingular={"Flower"} />
        ),
      },
      {
        path: "mezzuzahStory/:id",
        element: (
          <StoryPage
            resourceType={"Mezzuzot"}
            resourceTypeSingular={"Mezzuzah"}
          />
        ),
      },
    ],
  },
  {
    path: "admin",
    element: <DashboardLayout />,
    children: [
      { path: "/admin/", element: <Navigate to="/admin/home" /> },
      { path: "/admin/home", element: <EditHome /> },
      { path: "/admin/manageFlowers", element: <Navigate to="/admin/flowers" /> },
      { path: "/admin/manageMezzuzot", element: <Navigate to="/admin/mezzuzot" /> },
      { path: "login", element: <Login /> },
      {
        path: "flowers",
        element: (
          <StoryList resourceType={"Flowers"} resourceTypeSingular={"Flower"} />
        ),
      },
      {
        path: "flowers/new",
        element: <AddEditStory resourceType={"Flowers"} />,
      },
      {
        path: "flowers/:id",
        element: <AddEditStory resourceType={"Flowers"} />,
      },
      { path: "/admin/manageAboutUs", element: <About /> },
      { path: "/admin/manageAboutUs/:id", element: <EditAboutUs /> },
      { path: "webAnimation", element: <WebAnimation /> },
      {
        path: "mezzuzot",
        element: (
          <StoryList
            resourceType={"Mezzuzot"}
            resourceTypeSingular={"Mezzuzah"}
          />
        ),
      },
      {
        path: "mezzuzot/new",
        element: <AddEditStory resourceType={"Mezzuzot"} />,
      },
      {
        path: "mezzuzot/:id",
        element: <AddEditStory resourceType={"Mezzuzot"} />,
      },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/admin/404" /> },
    ],
  }
];

export default routes;
