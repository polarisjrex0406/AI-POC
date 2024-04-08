import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));
const Register = lazy(() => import('@/pages/Register.jsx'));

const Topic = lazy(() => import('@/pages/Topic/index'));
const Template = lazy(() => import('@/pages/Template/index'));
const TemplateCreate = lazy(() => import('@/pages/Template/TemplateCreate'));
const TemplateRead = lazy(() => import('@/pages/Template/TemplateRead'));
const TemplateUpdate = lazy(() => import('@/pages/Template/TemplateUpdate'));
const Experiment = lazy(() => import('@/pages/Experiment/index'));
const ExperimentCreate = lazy(() => import('@/pages/Experiment/ExperimentCreate'));
const ExperimentRead = lazy(() => import('@/pages/Experiment/ExperimentRead'));
const ExperimentUpdate = lazy(() => import('@/pages/Experiment/ExperimentUpdate'));
const Test = lazy(() => import('@/pages/Test/index'));
const TestCreate = lazy(() => import('@/pages/Test/TestCreate'));
const TestResult = lazy(() => import('@/pages/Test/TestResult'));
const TestRead = lazy(() => import('@/pages/Test/TestRead'));

const Admin = lazy(() => import('@/pages/Admin'));

const Email = lazy(() => import('@/pages/Email/index'));
const EmailRead = lazy(() => import('@/pages/Email/EmailRead'));
const EmailUpdate = lazy(() => import('@/pages/Email/EmailUpdate'));
const AdvancedSettings = lazy(() => import('@/pages/AdvancedSettings'));
const Profile = lazy(() => import('@/pages/Profile'));

const About = lazy(() => import('@/pages/About'));

let routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/verify/*',
      element: <Navigate to="/" />,
    },
    {
      path: '/resetpassword/*',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/',
      element: <Topic />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
    {
      path: '/email',
      element: <Email />,
    },
    {
      path: '/email/read/:id',
      element: <EmailRead />,
    },
    {
      path: '/email/update/:id',
      element: <EmailUpdate />,
    },

    {
      path: '/settings/advanced',
      element: <AdvancedSettings />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/topic',
      element: <Topic />,
    },
    {
      path: '/template/:topic',
      element: <Template />,
    },
    {
      path: '/template/create',
      element: <TemplateCreate />,
    },
    {
      path: '/template/read/:id',
      element: <TemplateRead />,
    },
    {
      path: '/template/update/:id',
      element: <TemplateUpdate />,
    },
    {
      path: '/experiment',
      element: <Experiment />,
    },
    {
      path: '/experiment/create',
      element: <ExperimentCreate />,
    },
    {
      path: '/experiment/read/:id',
      element: <ExperimentRead />,
    },
    {
      path: '/experiment/update/:id',
      element: <ExperimentUpdate />,
    },
    {
      path: '/test',
      element: <Test />,
    },
    {
      path: '/test/create',
      element: <TestCreate />,
    },
    {
      path: '/test/result',
      element: <TestResult />,
    },
    {
      path: '/test/read/:id',
      element: <TestRead />,
    },
  ],
};

export default routes;
