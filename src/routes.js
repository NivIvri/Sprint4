//import {HomePage} from './pages/home-page.jsx'
//import {AboutUs} from './pages/about-us.jsx'
//import {CarApp} from './pages/car-app.jsx'

import { Home } from "./pages/Home";
import { Queue } from "./pages/queue";
import { Search } from "./pages/search";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { StationDetails } from "./pages/station-details";
import { Stations } from "./pages/stations";
import { UserPref } from "./pages/user-pref";

const routes = [
    {
        path: '/',
        component: UserPref,
    },
    //{
    //    path: '/',
    //    component: Signin,
    //},
    // {
    //    path: '/signup',
    //    component: Signup,
    //},

    {
        path: '/home',
        component: Home,
    },
    {
        path: '/station/:stationId',
        component: StationDetails,
    },
    {
        path: '/queue',
        component: Queue,
    },
    //{
    //    path:'/about',
    //    component: AboutUs,
    //}
    {
        path: '/search',
        component: Search
    },
    {
        path: '/stations',
        component: Stations
    }


]

export default routes;