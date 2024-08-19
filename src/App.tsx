import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DownloadComponent from "./components/MainComponents/DownloadComponent";
import FontComponent from "./components/MainComponents/FontComponent";
import ImagesComponent from "./components/MainComponents/ImagesComponent";
import TextComponent from "./components/MainComponents/TextComponent";
import WelcomeComponent from "./components/OnboardingComponents/WelcomeComponent";
function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<WelcomeComponent />} />
        <Route path="home-component" element={<ImagesComponent />} />
        <Route path="text-component" element={<TextComponent />} />
        <Route path="font-component" element={<FontComponent />} />
        <Route path="download-component" element={<DownloadComponent />} />
      </Route>
    )
  );

  return <RouterProvider router={route} />;
}

export default App;
