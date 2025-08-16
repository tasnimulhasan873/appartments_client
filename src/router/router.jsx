import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import Apartments from "../Pages/Home/Apartments/Apartments";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import FAQ from "../Pages/Static/FAQ";
import PrivacyPolicy from "../Pages/Static/PrivacyPolicy";
import TermsOfService from "../Pages/Static/TermsOfService";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import PrivateRoutes from "../routes/PrivateRoutes";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import UserProfile from "../Pages/Dashboard/UserProfile";
import AdminRoutes from "../routes/AdminRoutes";
import SuperAdminRoutes from "../routes/SuperAdminRoutes";
import Forbidden from "../Pages/Dashboard/Forbidden";
import MemberProfile from "../Pages/Dashboard/Member/MemberProfile";
import UserAnnouncements from "../Pages/Dashboard/UserAnnouncements";
import MemberAnnouncements from "../Pages/Dashboard/Member/MemberAnnouncements";
import MakePayment from "../Pages/Dashboard/Member/MakePayment";
import MemberRoutes from "../routes/MemberRoutes";
import PaymentHistory from "../Pages/Dashboard/Member/PaymentHistory";
import MakeAnnouncement from "../Pages/Dashboard/Admin/MakeAnnouncement";
import AgreementRequests from "../Pages/Dashboard/Admin/AgreementRequests";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons";
import ManageMembers from "../Pages/Dashboard/Admin/ManageMembers";

// SuperAdmin Components
import SuperAdminProfile from "../Pages/Dashboard/SuperAdmin/SuperAdminProfile";
import AllUsers from "../Pages/Dashboard/SuperAdmin/AllUsers";
import AllProperties from "../Pages/Dashboard/SuperAdmin/AllProperties";
import SystemSettings from "../Pages/Dashboard/SuperAdmin/SystemSettings";
import WebsiteAnalytics from "../Pages/Dashboard/SuperAdmin/WebsiteAnalytics";

import StripeWrapper from "../Pages/Dashboard/Member/StripeWrapper";
import ManageProperties from "../Pages/Dashboard/Admin/ManageProperties";
import ApartmentDetails from "../Pages/Home/Apartments/ApartmentDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/apartments",
        Component: Apartments,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/faq",
        Component: FAQ,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "/terms-of-service",
        Component: TermsOfService,
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayouts />
      </PrivateRoutes>
    ),
    children: [
      // User routes
      {
        path: "userProfile",
        Component: UserProfile,
      },
      {
        path: "userAnnouncement",
        Component: UserAnnouncements,
      },

      // Member routes
      {
        path: "memberProfile",
        element: (
          <MemberRoutes>
            <MemberProfile />
          </MemberRoutes>
        ),
      },
      {
        path: "memberAnnouncement",
        element: (
          <MemberRoutes>
            <MemberAnnouncements />
          </MemberRoutes>
        ),
      },
      {
        path: "makePayment",
        element: (
          <MemberRoutes>
            <MakePayment />
          </MemberRoutes>
        ),
      },
      {
        path: "paymentForm",
        element: (
          <MemberRoutes>
            <StripeWrapper />
          </MemberRoutes>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <MemberRoutes>
            <PaymentHistory />
          </MemberRoutes>
        ),
      },

      // Admin routes
      {
        path: "adminProfile",
        element: (
          <AdminRoutes>
            <AdminProfile />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-members",
        element: (
          <AdminRoutes>
            <ManageMembers />
          </AdminRoutes>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminRoutes>
            <MakeAnnouncement />
          </AdminRoutes>
        ),
      },
      {
        path: "agreement-requests",
        element: (
          <AdminRoutes>
            <AgreementRequests />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoutes>
            <ManageCoupons />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-properties",
        element: (
          <AdminRoutes>
            <ManageProperties />
          </AdminRoutes>
        ),
      },

      // SuperAdmin routes - Updated with actual components
      {
        path: "superAdminProfile",
        element: (
          <SuperAdminRoutes>
            <SuperAdminProfile />
          </SuperAdminRoutes>
        ),
      },
      {
        path: "all-users",
        element: (
          <SuperAdminRoutes>
            <AllUsers />
          </SuperAdminRoutes>
        ),
      },
      {
        path: "all-properties",
        element: (
          <SuperAdminRoutes>
            <AllProperties />
          </SuperAdminRoutes>
        ),
      },
      {
        path: "system-settings",
        element: (
          <SuperAdminRoutes>
            <SystemSettings />
          </SuperAdminRoutes>
        ),
      },
      {
        path: "website-analytics",
        element: (
          <SuperAdminRoutes>
            <WebsiteAnalytics />
          </SuperAdminRoutes>
        ),
      },
      // (Removed duplicate /apartments/:id route from /dashboard children)
    ],
  },
]);
// (Removed from /dashboard children)
