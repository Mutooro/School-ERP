"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously, 
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  Users,
  Briefcase,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  BookOpen
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  
  // Auth Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"admin" | "teacher" | "student" | "parent">("student");
  
  // States
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [showGuestModal, setShowGuestModal] = useState(false);

  // Monitor auth status and redirect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            router.push(`/${role}/dashboard`);
          } else {
            // Default to student if no profile doc is found
            router.push("/student/dashboard");
          }
        } catch (err) {
          console.error("Error reading user role:", err);
          // Fallback based on email domains if firestore read fails
          if (currentUser.email?.includes("admin")) {
            router.push("/admin/dashboard");
          } else if (currentUser.email?.includes("teacher")) {
            router.push("/teacher/dashboard");
          } else if (currentUser.email?.includes("parent")) {
            router.push("/parent/dashboard");
          } else {
            router.push("/student/dashboard");
          }
        }
      } else {
        setUser(null);
        setAuthChecking(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error(err);
      setError(err.message.replace("Firebase: ", "") || "Failed to log in.");
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Create user document in Firestore with role
      await setDoc(doc(db, "users", cred.user.uid), {
        email: email,
        role: selectedRole,
        createdAt: new Date().toISOString()
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message.replace("Firebase: ", "") || "Registration failed.");
      setLoading(false);
    }
  };

  const handleGuestRoleSelection = async (role: "admin" | "teacher" | "student" | "parent") => {
    setError("");
    setLoading(true);
    setShowGuestModal(false);
    try {
      const cred = await signInAnonymously(auth);
      // Save role for guest in firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        email: `guest_${role}@simpkins.edu`,
        role: role,
        isGuest: true,
        createdAt: new Date().toISOString()
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to enter as guest.");
      setLoading(false);
    }
  };

  if (authChecking) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
          <p className="text-zinc-400 font-medium">Connecting to Simpkins ERP...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-zinc-950 overflow-hidden px-4 font-sans selection:bg-violet-500/35 text-zinc-100">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>
      
      {/* Main Card */}
      <div className="relative w-full max-w-md bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl space-y-8 animate-fade-in z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-violet-500/10">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Simpkins School ERP</h1>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
              Access the secure role-based school management system dashboards.
            </p>
          </div>
        </div>

        {/* Display Error Message */}
        {error && (
          <div className="flex items-start gap-3 rounded-2xl bg-red-500/5 border border-red-500/15 p-4 text-xs text-red-400 leading-normal">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 h-4.5 w-4.5 text-zinc-500" />
              <input 
                type="email"
                placeholder="name@school.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-2xl text-sm font-medium text-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400">Security Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 h-4.5 w-4.5 text-zinc-500" />
              <input 
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-2xl text-sm font-medium text-white transition-all outline-none"
              />
            </div>
          </div>

          {/* Registration Role Selection */}
          {isRegistering && (
            <div className="space-y-2 animate-fade-in">
              <label className="text-xs font-semibold text-zinc-400">Select Account Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as any)}
                className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-800 hover:border-zinc-700 focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 rounded-2xl text-sm font-medium text-zinc-300 outline-none"
              >
                <option value="student">Student Dashboard</option>
                <option value="admin">System Administrator</option>
                <option value="teacher">Class Teacher</option>
                <option value="parent">Parent / Guardian</option>
              </select>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-violet-600/15 hover:shadow-violet-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
            ) : (
              <span>{isRegistering ? "Register New Account" : "Secure Log In"}</span>
            )}
          </button>
        </form>

        {/* Separator / Quick Access Option */}
        <div className="space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-zinc-800"></div>
            <span className="absolute bg-zinc-950 px-3 text-xxs font-bold tracking-wider text-zinc-500 uppercase">Alternative</span>
          </div>

          <button 
            onClick={() => setShowGuestModal(true)}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-950/40 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-2xl text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>Explore as Guest (Anonymous Sandbox)</span>
          </button>
        </div>

        {/* Form Toggle Footer */}
        <div className="text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xxs text-violet-400 hover:text-violet-300 font-bold hover:underline cursor-pointer"
          >
            {isRegistering ? "Already have an account? Sign In" : "Need a sandbox account? Register here"}
          </button>
        </div>

      </div>

      {/* Guest Role Selector Modal */}
      {showGuestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-2xl space-y-6 animate-slide-in">
            <div className="text-center space-y-2">
              <Sparkles className="h-8 w-8 text-amber-400 mx-auto animate-pulse" />
              <h2 className="text-lg font-extrabold text-white">Select Dashboard Role</h2>
              <p className="text-xxs text-zinc-400">Choose which role portal you wish to preview and test.</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {[
                { name: "System Administrator", role: "admin", icon: ShieldCheck, color: "hover:border-violet-500/40 hover:bg-violet-500/5 text-violet-400" },
                { name: "Class Teacher", role: "teacher", icon: Briefcase, color: "hover:border-amber-500/40 hover:bg-amber-500/5 text-amber-400" },
                { name: "Student Dashboard", role: "student", icon: GraduationCap, color: "hover:border-indigo-500/40 hover:bg-indigo-500/5 text-indigo-400" },
                { name: "Parent Dashboard", role: "parent", icon: Users, color: "hover:border-pink-500/40 hover:bg-pink-500/5 text-pink-400" }
              ].map((option) => (
                <button
                  key={option.role}
                  onClick={() => handleGuestRoleSelection(option.role as any)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:scale-[1.02] text-xs font-bold transition-all cursor-pointer ${option.color}`}
                >
                  <div className="flex items-center gap-2.5">
                    <option.icon className="h-4.5 w-4.5" />
                    <span>{option.name}</span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowGuestModal(false)}
              className="w-full py-2 bg-zinc-950 border border-zinc-850 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-xl text-xxs font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
