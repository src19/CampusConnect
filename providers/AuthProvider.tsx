import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
  currentUserId: string | null; // Add currentUserId property
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  currentUserId: null, // Initialize currentUserId to null
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId,setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // Fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);

        // Set currentUserId if user is logged in
        const currentUserId = session?.user?.id; // Get user ID from session
        setCurrentUserId(currentUserId);
      }
      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        // Update currentUserId on auth state change
        const currentUserId = session?.user?.id;
        setCurrentUserId(currentUserId);
      } else {
        setCurrentUserId(null); // Set to null on logout
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, profile, isAdmin: profile?.group === 'ADMIN', currentUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

