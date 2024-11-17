import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from "../store/useAuthStore";
import ProtectedRoute from "../components/ProtectedRoute";
import '@/app/globals.css';

// Create a Query Client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    const token = useAuthStore((state) => state.token);
    const savedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    return (
        <QueryClientProvider client={queryClient}>
            <>
                {/* StrictMode ko hata diya */}
                {(token || savedToken) ? (
                    <ProtectedRoute>
                        <Component {...pageProps} />
                    </ProtectedRoute>
                ) : (
                    <Component {...pageProps} />
                )}
            </>
        </QueryClientProvider>
    );
}

export default MyApp;
