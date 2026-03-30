import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { RootState } from "./redux/store";
import { refreshToken } from "./redux/actions/authAction";
import { getCurrentGoals } from "./redux/actions/goalAction";
import { getCurrentPlans } from "./redux/actions/planAction";

import ScrollToTop from "./components/global/ScrollToTop";
import { Alert } from "./components/alert/Alert";

// ── Pages ─────────────────────────────────────────────────────────────────────
import Home        from "./pages/index";
import Login       from "./pages/login";
import Register    from "./pages/register";
import Active      from "./pages/active/[slug]";
import Goals       from "./pages/goals";
import Plans       from "./pages/plans";
import PlanDetail  from "./pages/plan/[slug]";
import Actions     from "./pages/actions";
import Journal     from "./pages/journal";
import Friends     from "./pages/friends";
import History     from "./pages/history";
import Profile     from "./pages/profile/[slug]";
import About       from "./pages/about";
import Help        from "./pages/help";
import Privacy     from "./pages/privacy";
import Terms       from "./pages/terms";
import Category    from "./pages/category";
import NotFound    from "./components/global/NotFound";

// ── Route guards ──────────────────────────────────────────────────────────────

interface IGuardProps {
  children: JSX.Element;
  isAuth: boolean;
}

/** Redirects unauthenticated users to /login */
const ProtectedRoute = ({ children, isAuth }: IGuardProps) => {
  return isAuth ? children : <Navigate to="/login" replace />;
};

/** Redirects already-authenticated users away from auth pages */
const PublicOnlyRoute = ({ children, isAuth }: IGuardProps) => {
  return isAuth ? <Navigate to="/goals" replace /> : children;
};

// ── App ───────────────────────────────────────────────────────────────────────

const App = () => {
  const { auth } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const isAuth = !!auth.access_token;

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      dispatch(getCurrentGoals());
      dispatch(getCurrentPlans());
    }
  }, [isAuth, dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Alert />
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/active/:slug" element={<Active />} />

        {/* ── Auth (redirect if already logged in) ── */}
        <Route path="/login" element={
          <PublicOnlyRoute isAuth={isAuth}><Login /></PublicOnlyRoute>
        } />
        <Route path="/register" element={
          <PublicOnlyRoute isAuth={isAuth}><Register /></PublicOnlyRoute>
        } />

        {/* ── Protected ── */}
        <Route path="/goals" element={
          <ProtectedRoute isAuth={isAuth}><Goals /></ProtectedRoute>
        } />
        <Route path="/plans" element={
          <ProtectedRoute isAuth={isAuth}><Plans /></ProtectedRoute>
        } />
        <Route path="/plan/:slug" element={
          <ProtectedRoute isAuth={isAuth}><PlanDetail /></ProtectedRoute>
        } />
        <Route path="/actions" element={
          <ProtectedRoute isAuth={isAuth}><Actions /></ProtectedRoute>
        } />
        <Route path="/journal" element={
          <ProtectedRoute isAuth={isAuth}><Journal /></ProtectedRoute>
        } />
        <Route path="/friends" element={
          <ProtectedRoute isAuth={isAuth}><Friends /></ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute isAuth={isAuth}><History /></ProtectedRoute>
        } />
        <Route path="/profile/:slug" element={
          <ProtectedRoute isAuth={isAuth}><Profile /></ProtectedRoute>
        } />
        <Route path="/category" element={
          <ProtectedRoute isAuth={isAuth}><Category /></ProtectedRoute>
        } />

        {/* ── 404 ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;