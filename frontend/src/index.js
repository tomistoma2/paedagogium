import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Routes, Route, BrowserRouter, Switch } from "react-router-dom";
import Courses from './Content/Courses';
import Events from './Content/Events';
import ExcellentTeachers from './Content/ExcellentTeachers';
import Inspiration from './Content/Inspiration';
import Science from './Content/Science';
import AboutConference from './Content/AboutConference';
import Search from './Content/Search';
import ConferenceDashboard from './Content/Dashboards/ConferenceDashboard';
import Welcome from './Content/Welcome';
import Lecturers from './Content/Courses/Lecturers';
import Register from './Content/Courses/Register';
import Consultation from './Content/Courses/Consultation';
import References from './Content/Courses/References';
import DetailEvent from './Content/DetailEvent';
import Dashboard from './Content/Dashboard';
import About from './Content/About';
import EffectiveTeaching from './Content/EffectiveTeaching';
import Content from './Content/Content';
import AboutMembers from './Content/AboutMembers';
import AboutContact from './Content/AboutContact';
import AboutConferenceInfo from './Content/AboutConferenceInfo';
import ScienceDashboard from './Content/Dashboards/ScienceDashboard';
import AboutDashboard from './Content/Dashboards/AboutDashboard';
import EventDashboard from './Content/Dashboards/EventDashboard';
import CoursesDashboard from './Content/Dashboards/CoursesDashboard';
import ImagesCarousel from './Content/Dashboards/ImagesCarousel';
import ExcellentTeachersDashboard from './Content/Dashboards/ExcellentTeachersDashboard';
import InspirationDashboard from './Content/Dashboards/InspirationDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/about/main" element={<About />} />
    <Route path="/about/members" element={<AboutMembers />} />
    <Route path="/about/contact" element={<AboutContact />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/courses/lecturers" element={<Lecturers />} />
    <Route path="/about/conference" element={<AboutConference />} />
    <Route path="/about/conferenceInfo" element={<AboutConferenceInfo />} />
    <Route path="/courses/register" element={<Register />} />
    <Route path="/courses/consultation" element={<Consultation />} />
    <Route path="/courses/references" element={<References />} />
    <Route path="/courses/content" element={<Content />} />
    <Route path="/events" element={<Events />} />
    <Route path="/search" element={<Search />} />
    <Route path="/excellent-teachers" element={<ExcellentTeachers />} />
    <Route path="/inspiration" element={<Inspiration />} />
    <Route path="/science" element={<Science />} />
    <Route path="/effective-teaching" element={<EffectiveTeaching />} />
    <Route path="/detail/id/:id" element={<DetailEvent />}/>
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/dashboard/science" element={<ScienceDashboard />}/>
    <Route path="/dashboard/inspiration" element={<InspirationDashboard />}/>
    <Route path="/dashboard/about" element={<AboutDashboard />}/>
    <Route path="/dashboard/imagesCarousel" element={<ImagesCarousel />}/>
    <Route path="/dashboard/conference" element={<ConferenceDashboard/>}/>
    <Route path="/dashboard/courses" element={<CoursesDashboard />}/>
    <Route path="/dashboard/event" element={<EventDashboard />}/>
    <Route path="/dashboard/excellent-teachers" element={<ExcellentTeachersDashboard />}/>
    
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

