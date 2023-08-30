import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { PlaylistPage } from "./pages/PlaylistPage";
import { ErrorPage } from "./pages/ErrorPage";
import { SearchPage } from "./pages/SearchPage";
import { MyPlaylist } from "./pages/PersonalPlaylist";
import { ArtistPage } from "./pages/ArtistsPage";
import { AlbumPage } from "./pages/AlbumPage";
import { RegisterPage } from "./pages/SignUp";
import { SignInPage } from "./pages/SignIn";
import { AllSongs } from "./pages/AllSongs";
import { PlaylistSongs } from "./pages/PlaylistSongs";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <RegisterPage />
            },
            {
                path:"signin",
                element: <SignInPage />
            },
            {
                path:"home",
                element: <HomePage />,
            },
            {
                path: "playlistPage/:name",
                element: <PlaylistPage />,
            },
            {
                path:"searchPage/",
                element: <SearchPage />,
            },
            {
                path:"myPlaylist/",
                element: <MyPlaylist />,
            }, 
            {
                path:"artist/:name",
                element: <ArtistPage />
            },
            {
                path:"album/:name",
                element: <AlbumPage />
            },
            {
                path:"allsongs/",
                element: <AllSongs />
            }, {
                path:"playlistsongs/:id",
                element: <PlaylistSongs />
            }
        ]
    }
]);