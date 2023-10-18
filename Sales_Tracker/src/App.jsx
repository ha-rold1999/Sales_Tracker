import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Login from "./Components/Login/Login";
import PageNotFound from "./Components/Fallbacks/PageNotFound";
import SuspenseFallBack from "./Components/Fallbacks/SuspenseFallBack";
import ErrorFallback from "./Components/Fallbacks/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const MainPage = lazy(() => import("./Components/Menu/MainPage"));
const Sales = lazy(() => import("./Components/Sales/Sales"));
const Inventory = lazy(() => import("./Components/Inventory/Inventory"));
const Expenses = lazy(() => import("./Components/Expense/Expenses"));
const Register = lazy(() => import("./Components/Register/Register"));
const Account = lazy(() => import("./Components/Account/Account"));
const Archive = lazy(() => import("./Components/Archive/Archive"));
const Danger = lazy(() => import("./Components/Danger/Danger"));
const ChangePassword = lazy(() => import("./Components/Danger/ChangePassword"));
const Statistics = lazy(() => import("./Components/Statistics/Statistics"));

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/menu"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <MainPage />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/sales"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/menu")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <Sales />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/inventory/*"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/menu")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <Inventory />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/expenses/*"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/menu")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <Expenses />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/register"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <Register />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/account"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <Account />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/archive"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/menu")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <Archive />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/danger"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/menu")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <Danger />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/change-password"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/menu")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <ChangePassword />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="/statistics"
              element={
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => (window.location.href = "/menu")}>
                  <Suspense fallback={<SuspenseFallBack />}>
                    <Statistics />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
