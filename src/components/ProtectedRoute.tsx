
import { useAuth } from "./auth/AuthProvider";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a better loading state
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-t-2 border-primary border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log("No user found, redirecting");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
