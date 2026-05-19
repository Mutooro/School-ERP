"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { 
  GraduationCap, 
  LayoutDashboard, 
  DollarSign, 
  Calendar, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon, 
  ShieldCheck,
  Briefcase,
  Users,
  Award,
  MessageSquare
} from "lucide-react";

interface NavigationShellProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "student" | "teacher" | "parent";
}

export default function NavigationShell({ children, requiredRole }: NavigationShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/");
        return;
      }

      setUser(currentUser);

      try {
        // Fetch role from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          setRole(userRole);

          // Verify required role if specified
          if (requiredRole && userRole !== requiredRole) {
            console.warn(`Unauthorized access. Role: ${userRole}, Required: ${requiredRole}`);
            router.push("/");
          }
        } else {
          // If no doc, default to student role for anonymous or standard test logins
          setRole("student");
          if (requiredRole && requiredRole !== "student") {
            router.push("/");
          }
        }
      } catch (err) {
        console.error("Error fetching user role from Firestore:", err);
        // Fallback default role based on current path if offline/emulator issues
        if (pathname.includes("/admin")) {
          setRole("admin");
        } else if (pathname.includes("/teacher")) {
          setRole("teacher");
        } else if (pathname.includes("/parent")) {
          setRole("parent");
        } else {
          setRole("student");
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, requiredRole, pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Define navigation links based on role
  const getNavLinks = () => {
    const commonLinks = [];
    switch (role) {
      case "admin":
        return [
          { name: "Admin Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
          { name: "Fees & Accounts", href: "/admin/fees", icon: DollarSign },
          { name: "Attendance Portal", href: "/admin/attendance", icon: Calendar },
        ];
      case "teacher":
        return [
          { name: "Teacher Dashboard", href: "/teacher/dashboard", icon: LayoutDashboard },
          { name: "Attendance Registry", href: "/admin/attendance", icon: Calendar },
        ];
      case "parent":
        return [
          { name: "Parent Dashboard", href: "/parent/dashboard", icon: LayoutDashboard },
        ];
      case "student":
      default:
        return [
          { name: "Student Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
        ];
    }
  };

  const navLinks = getNavLinks();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-white font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
          <p className="text-zinc-400 font-medium text-sm">Securing your session...</p>
        </div>
      </div>
    );
  }

  const roleLabels: Record<string, { label: string; color: string }> = {
    admin: { label: "Administrator", color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
    teacher: { label: "Teacher Portal", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    student: { label: "Student Portal", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    parent: { label: "Parent Portal", color: "text-pink-400 bg-pink-500/10 border-pink-500/20" }
  };

  const currentRoleInfo = roleLabels[role || "student"] || roleLabels.student;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col md:flex-row relative">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-violet-600/5 blur-[100px] pointer-events-none z-0"></div>

      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white">Simpkins ERP</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Sidebar - Desktop */}
      <aside className={`fixed md:sticky top-0 z-40 h-[calc(100vh-69px)] md:h-screen w-full md:w-64 bg-zinc-950 border-r border-zinc-900 flex flex-col justify-between p-6 transition-all duration-300 md:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:block"
      }`}>
        <div className="space-y-8">
          {/* Brand Logo */}
          <div className="hidden md:flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block">Simpkins ERP</span>
              <span className="text-xxs text-zinc-500 font-semibold block">Academic Hub</span>
            </div>
          </div>

          {/* User Profile Info */}
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-850 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-400">
                <UserIcon className="h-4.5 w-4.5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white block truncate">{user?.email || "Guest User"}</span>
                <span className={`inline-block mt-0.5 text-[9px] px-2 py-0.5 rounded-full font-bold border ${currentRoleInfo.color}`}>
                  {currentRoleInfo.label}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block px-2.5 mb-2">Navigation</span>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push(link.href);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/10" 
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <link.icon className={`h-4.5 w-4.5 ${isActive ? "text-white" : "text-zinc-500"}`} />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout section */}
        <div className="pt-4 border-t border-zinc-900">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-h-[calc(100vh-69px)] md:min-h-screen overflow-x-hidden z-10 flex flex-col">
        {children}
      </div>

    </div>
  );
}
