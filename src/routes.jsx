import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './middleware/Protectedroute';

// Public components
const NotFound = lazy(() => import('./pages/NotFound'))
const HomeIndex = lazy(() => import('./pages/home/Index'))
const EventsPage = lazy(() => import('./pages/public/EventsPage'))
const About = lazy(() => import('./pages/home/About'))
const Give = lazy(() => import('./pages/home/Give'))
const Messages = lazy(() => import('./pages/home/Messages'))
const TalkToPPC = lazy(() => import('./pages/home/TalkToPPC'))
const TrainingsIndex = lazy(() => import('./pages/trainings/Index'))
const LFC = lazy(() => import('./pages/trainings/LFC'))
const LDC = lazy(() => import('./pages/trainings/LDC'))
const AdminLogin = lazy(() => import('./pages/auth/Login'))
const Forum = lazy(() => import('./pages/forum/Forum'))
const Signup = lazy(() => import('./pages/forum/Signup'))
const ForumLogin = lazy(() => import('./pages/forum/Login'))
const Contact = lazy(() => import('./pages/public/Contact'))
const AuthForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const ForumForgotPassword = lazy(() => import('./pages/forum/ForgotPassword'))
const ForumResetPassword = lazy(() => import('./pages/forum/ResetPassword'))

// Admin components
const AdminLayout = lazy(() => import('./layouts/AdminLayout'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminManagement = lazy(() => import('./pages/admin/AdminManagement'))
const EventSetting = lazy(() => import('./pages/admin/EventSetting'))
const Gallery = lazy(() => import('./pages/admin/Gallery'))
const Posts = lazy(() => import('./pages/admin/Posts'))
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile'))
const Inbox = lazy(() => import('./pages/admin/Inbox'))
const Settings = lazy(() => import('./pages/admin/Settings'))
const Newsletter = lazy(() => import('./pages/admin/Newsletter'))

// Main routes configuration
export const routes = [
  {
    path: '/',
    element: <HomeIndex />,
    name: 'Home',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/about',
    element: <About />,
    name: 'About',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/give',
    element: <Give />,
    name: 'Give',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/talk-2-ppc',
    element: <TalkToPPC />,
    name: 'Talk 2 PPC',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/messages',
    element: <Messages />,
    name: 'Sermons',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/trainings',
    element: <TrainingsIndex />,
    name: 'Trainings',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/trainings/lfc',
    element: <LFC />,
    name: 'LFC',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/trainings/ldc',
    element: <LDC />,
    name: 'LDC',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/events',
    element: <EventsPage />,
    name: 'Events',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/forum/signup',
    element: <Signup />,
    name: 'Forum Signup',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/contact',
    element: <Contact />,
    name: 'Contact',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/forgot-password',
    element: <AuthForgotPassword />,
    name: 'Forgot Password',
    showInNav: true,
    showInFooter: false,
  },
  {
    path: '/forum/forgot-password',
    element: <ForumForgotPassword />,
    name: 'Forum Forgot Password',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/forum/reset-password',
    element: <ForumResetPassword />,
    name: 'Forum Reset Password',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/forum',
    element: <ProtectedRoute> <Forum /> </ProtectedRoute>,
    name: 'Forum',
    showInNav: true,
    showInFooter: false,
  },

  // 👇 ADMIN LOGIN
  {
    path: '/admin/login',
    element: <AdminLogin />,
    name: 'Admin Login',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/forum/login',
    element: <ForumLogin />,
    name: 'Forum Login',
    showInNav: false,
    showInFooter: false,
  },

  // 👇 ADMIN PROTECTED ROUTES
  {
    path: '/admin',
    element: (
      <ProtectedRoute redirectTo="/admin/login">
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        name: 'Dashboard',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'admins',
        element: <AdminManagement />,
        name: 'Admins',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'events',
        element: <EventSetting />,
        name: 'Events',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'gallery',
        element: <Gallery />,
        name: 'Gallery',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'posts',
        element: <Posts />,
        name: 'Posts',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'inbox',
        element: <Inbox />,
        name: 'Inbox',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'settings',
        element: <Settings />,
        name: 'Settings',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
        name: 'Newsletter',
        showInNav: true,
        showInFooter: false,
        isAdmin: true,
      },
      {
        path: 'profile',
        element: <AdminProfile />,
        name: 'My Profile',
        showInNav: false,
        showInFooter: false,
        isAdmin: true,
      },
    ],
  },

  // 👇 CATCH-ALL
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found',
    showInNav: false,
  },
]

