"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationShell from "@/components/NavigationShell";
import { 
  Users, 
  DollarSign, 
  Calendar, 
  BookOpen, 
  Briefcase, 
  Layers, 
  ChevronRight, 
  TrendingUp, 
  MessageSquare, 
  Bus, 
  Search, 
  Award, 
  Sparkles, 
  ShieldCheck,
  ArrowRight,
  Plus,
  Send,
  Loader2,
  Check
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();

  // Active Modular Drawer (All 8 core ERP modules)
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);

  // 1. Student Info Management
  const [studentSearch, setStudentSearch] = useState("");
  const students = [
    { id: "MM-232", name: "Martin Mutooro", class: "Grade 10-A", roll: 23, gpa: 3.82, status: "Active" },
    { id: "AS-101", name: "Aarav Sharma", class: "Grade 10-A", roll: 1, gpa: 3.90, status: "Active" },
    { id: "SP-102", name: "Sneha Patel", class: "Grade 10-A", roll: 12, gpa: 3.65, status: "Active" },
    { id: "RK-103", name: "Rohan Kapoor", class: "Grade 10-A", roll: 7, gpa: 3.78, status: "Active" },
    { id: "AS-104", name: "Ananya Sen", class: "Grade 10-A", roll: 19, gpa: 3.42, status: "Inactive" },
  ];

  // 4. Exams & Grading (CCE Rubrics)
  const [cceStudent, setCceStudent] = useState("Martin Mutooro");
  const [algebraScore, setAlgebraScore] = useState("94");
  const [physicsScore, setPhysicsScore] = useState("88");
  const [calculatedCard, setCalculatedCard] = useState<any>(null);

  const handleCalculateGrades = () => {
    const alg = parseFloat(algebraScore) || 0;
    const phy = parseFloat(physicsScore) || 0;
    const avg = Math.round((alg + phy) / 2);
    let letter = "F";
    if (avg >= 90) letter = "A";
    else if (avg >= 80) letter = "B";
    else if (avg >= 70) letter = "C";
    
    setCalculatedCard({
      name: cceStudent,
      average: avg,
      grade: letter,
      date: new Date().toLocaleDateString()
    });
  };

  // 5. HR & Payroll
  const [hrStaff, setHrStaff] = useState([
    { name: "Dr. Bhatia", role: "Physics Faculty", baseSalary: 3500, processed: false },
    { name: "Mrs. Sharma", role: "Math Lead", baseSalary: 3400, processed: false },
    { name: "Mr. Kapoor", role: "History Faculty", baseSalary: 3200, processed: false },
  ]);
  const [payrollLoading, setPayrollLoading] = useState(false);

  const handleProcessPayroll = () => {
    setPayrollLoading(true);
    setTimeout(() => {
      setHrStaff(prev => prev.map(staff => ({ ...staff, processed: true })));
      setPayrollLoading(false);
      alert("Payroll successfully processed for active faculty!");
    }, 1500);
  };

  // 6. Parent Comm circulars
  const [bulletins, setBulletins] = useState([
    { id: 1, title: "Term 3 Examination Timetable Published", date: "2026-05-18", category: "Academics" },
    { id: 2, title: "Annual Sports Meet Rescheduled to June", date: "2026-05-15", category: "Events" },
  ]);
  const [newBulletinText, setNewBulletinText] = useState("");
  const [circularSent, setCircularSent] = useState(false);

  const handleSendCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBulletinText.trim()) return;
    
    setBulletins(prev => [{
      id: Date.now(),
      title: newBulletinText,
      date: new Date().toISOString().split("T")[0],
      category: "Circular"
    }, ...prev]);
    setNewBulletinText("");
    setCircularSent(true);
    setTimeout(() => setCircularSent(false), 3000);
  };

  // 7. Transport & Hostel Allocation
  const transportRoutes = [
    { route: "Route Bus A", driver: "Rajesh Kumar", riders: 42, path: "Agra Maruti Estate" },
    { route: "Route Bus B", driver: "Sanjay Singh", riders: 30, path: "Sikandra Crossing" },
  ];
  const hostelRooms = [
    { room: "Dorm Room 101", capacity: "4 / 4 Occupied", occupants: "Martin, Aarav, Sneha, Rohan" },
    { room: "Dorm Room 102", capacity: "2 / 4 Occupied", occupants: "Ananya, Kabir" },
  ];

  // 8. Library Book catalog & Supplies Inventory
  const [libraryBooks, setLibraryBooks] = useState([
    { id: "LIB-401", title: "Introduction to Algorithms", author: "Cormen", status: "Available" },
    { id: "LIB-402", title: "Principles of Physics", author: "Halliday", status: "Checked Out" },
    { id: "LIB-403", title: "World History Atlas", author: "Atlas", status: "Available" },
  ]);
  const [bookSearch, setBookSearch] = useState("");

  const handleToggleBookStatus = (bookId: string) => {
    setLibraryBooks(prev => prev.map(book => 
      book.id === bookId 
        ? { ...book, status: book.status === "Available" ? "Checked Out" : "Available" } 
        : book
    ));
  };

  return (
    <NavigationShell requiredRole="admin">
      <main className="p-6 md:p-8 space-y-8 animate-fade-in relative z-10 flex-1">
        
        {/* Top greeting header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">Administrative Console</h1>
            <p className="text-xs text-zinc-400">Complete control panel for Simpkins School ERP integrated infrastructure.</p>
          </div>
        </div>

        {/* Headline Statistics bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Active Admissions", value: "1,248 Students", icon: Users, color: "text-violet-400 bg-violet-500/5 border-violet-500/10" },
            { label: "Current Tuition Fees", value: "$42,890.00", icon: DollarSign, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
            { label: "Internal Assessments", value: "Grade CCE Rubrics", icon: BookOpen, color: "text-sky-400 bg-sky-500/5 border-sky-500/10" },
            { label: "Active Faculty", value: "48 Instructors", icon: Briefcase, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between gap-4 shadow-sm hover:border-zinc-700/60 transition-all">
              <div className="space-y-1">
                <span className="text-xxs font-bold text-zinc-500 uppercase tracking-wider">{stat.label}</span>
                <div className="text-lg font-bold text-white tracking-tight">{stat.value}</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                <stat.icon className="h-4.5 w-4.5" />
              </div>
            </div>
          ))}
        </div>

        {/* CORE 8 MODULES HUB GRID */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
            <Layers className="h-4.5 w-4.5 text-violet-400" /> Integrated Modules Core Portal
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Student Information */}
            <div 
              onClick={() => setActiveDrawer("students")}
              className="bg-zinc-900/45 border border-zinc-850 p-6 rounded-2xl hover:border-violet-500/30 transition-all cursor-pointer group space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400 group-hover:scale-105 transition-all">
                  <Users className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-violet-400 transition-all" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Student Info Manager</h4>
                <p className="text-zinc-500 text-xxs leading-relaxed">Admissions databases, rosters, GPA trackers, and registry histories.</p>
              </div>
            </div>

            {/* 2. Fee and Finance */}
            <div 
              onClick={() => router.push("/admin/fees")}
              className="bg-zinc-900/45 border border-zinc-850 p-6 rounded-2xl hover:border-emerald-500/30 transition-all cursor-pointer group space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-all">
                  <DollarSign className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-emerald-400 transition-all" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Fee & Finance Center</h4>
                <p className="text-zinc-500 text-xxs leading-relaxed">Invoicing receipt ledger, online portal payment gateway and outstanding dues.</p>
              </div>
            </div>

            {/* 3. Attendance and Timetable */}
            <div 
              onClick={() => router.push("/admin/attendance")}
              className="bg-zinc-900/45 border border-zinc-850 p-6 rounded-2xl hover:border-sky-500/30 transition-all cursor-pointer group space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-sky-600/10 border border-sky-500/20 text-sky-400 group-hover:scale-105 transition-all">
                  <Calendar className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-sky-400 transition-all" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Attendance & Schedules</h4>
                <p className="text-zinc-500 text-xxs leading-relaxed">Toggle student attendance, class time table scheduler and monthly analytics.</p>
              </div>
            </div>

            {/* 4. Examination and Grading */}
            <div 
              onClick={() => setActiveDrawer("exams")}
              className="bg-zinc-900/45 border border-zinc-850 p-6 rounded-2xl hover:border-amber-500/30 transition-all cursor-pointer group space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-amber-600/10 border border-amber-500/20 text-amber-400 group-hover:scale-105 transition-all">
                  <Award className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-amber-400 transition-all" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Exams & Grading</h4>
                <p className="text-zinc-500 text-xxs leading-relaxed">Assessment schedules, CCE report cards and grading rubric generators.</p>
              </div>
            </div>

            {/* 5. Human Resources & Payroll */}
            <div 
              onClick={() => setActiveDrawer("hr")}
              className="bg-zinc-900/45 border border-zinc-850 p-6 rounded-2xl hover:border-indigo-500/30 transition-all cursor-pointer group space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-all">
                  <Briefcase className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-indigo-400 transition-all" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">HR & Faculty Payroll</h4>
                <p className="text-zinc-500 text-xxs leading-relaxed">Staff directories, attendance, and instant pay stub payroll processors.</p>
              </div>
            </div>

            {/* 6. Parent-Teacher Communication */}
            <div 
              onClick={() => setActiveDrawer("comm")}
              className="bg-zinc-900/45 border border-zinc-850 p-6 rounded-2xl hover:border-pink-500/30 transition-all cursor-pointer group space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-pink-600/10 border border-pink-500/20 text-pink-400 group-hover:scale-105 transition-all">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-pink-400 transition-all" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Parent Communication</h4>
                <p className="text-zinc-500 text-xxs leading-relaxed">Direct messaging bulletin, push newsletters and academic circular alerts.</p>
              </div>
            </div>

            {/* 7. Transport and Hostel */}
            <div 
              onClick={() => setActiveDrawer("transport")}
              className="bg-zinc-900/45 border border-zinc-850 p-6 rounded-2xl hover:border-teal-500/30 transition-all cursor-pointer group space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-teal-600/10 border border-teal-500/20 text-teal-400 group-hover:scale-105 transition-all">
                  <Bus className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-teal-400 transition-all" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Transport & Hostel</h4>
                <p className="text-zinc-500 text-xxs leading-relaxed">School bus route listings, GPS coordinates and hostel room allocations.</p>
              </div>
            </div>

            {/* 8. Library and Inventory */}
            <div 
              onClick={() => setActiveDrawer("library")}
              className="bg-zinc-900/45 border border-zinc-850 p-6 rounded-2xl hover:border-rose-500/30 transition-all cursor-pointer group space-y-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-rose-600/10 border border-rose-500/20 text-rose-400 group-hover:scale-105 transition-all">
                  <BookOpen className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-rose-400 transition-all" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Library & Supply Stock</h4>
                <p className="text-zinc-500 text-xxs leading-relaxed">Book issue checkout catalogs and school supplies inventory trackers.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Pilot overview alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-850 p-6 rounded-2xl space-y-5">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-violet-400" /> Active School ERP Infrastructure
            </h3>
            
            <div className="space-y-3.5">
              {[
                { title: "Real-Time Parent circulars Dispatcher", desc: "Instantly sends SMS notifications to emergency parent lists.", badge: "Genkit Active" },
                { title: "Relational PostgreSQL database schema online", desc: "All core tables generated directly into the dataconnect schema.", badge: "SQL Active" },
                { title: "Tuition collection processor active", desc: "Automated billing gateways linked on client student dashboard.", badge: "Secure" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950 border border-zinc-900">
                  <div className="h-2 w-2 rounded-full bg-violet-500 mt-2 shrink-0"></div>
                  <div className="flex-1 space-y-1">
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <div className="text-xxs text-zinc-400">{item.desc}</div>
                  </div>
                  <span className="text-xxs px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-850 text-zinc-400 font-semibold">{item.badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-amber-400 animate-pulse" /> Administration Session
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                You are currently running in an active Administrator session. Select modules above to configure students, report cards, finance ledgers, and staff directories.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* ==========================================
          SLIDE DRAWER CORE MODULE IMPLEMENTATIONS
         ========================================== */}
      
      {/* 1. STUDENT INFO DRAWER */}
      {activeDrawer === "students" && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between animate-slide-in shadow-2xl">
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-xl">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Student Info Management</div>
                  <div className="text-xxs text-zinc-400">Database & Academic Records</div>
                </div>
              </div>
              <button onClick={() => setActiveDrawer(null)} className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="flex-1 p-5 space-y-4 overflow-y-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 h-4 w-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search student profile..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-white outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-3.5">
                {students.filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase())).map(student => (
                  <div key={student.id} className="p-4 bg-zinc-900/50 border border-zinc-850 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white">{student.name}</div>
                      <div className="text-xxs text-zinc-500 font-semibold">{student.class} • Roll #{student.roll}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-xs font-extrabold text-violet-400">{student.gpa} GPA</div>
                      <span className="text-xxs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold">
                        {student.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex gap-3">
              <button onClick={() => { router.push("/student/dashboard"); setActiveDrawer(null); }} className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold transition-all text-center">
                Preview Active Student Portal View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. EXAMS & CC GRADING DRAWER */}
      {activeDrawer === "exams" && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between animate-slide-in shadow-2xl">
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Examinations & CCE Grading</div>
                  <div className="text-xxs text-zinc-400">Assessments & Report Card Generator</div>
                </div>
              </div>
              <button onClick={() => setActiveDrawer(null)} className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="flex-1 p-5 space-y-5 overflow-y-auto">
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl text-xxs text-zinc-400 leading-relaxed font-semibold">
                Generate instant assessment summaries. Grades are dynamically calculated using target Simpkins high-school rubrics.
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400">Select Student</label>
                  <select 
                    value={cceStudent}
                    onChange={(e) => setCceStudent(e.target.value)}
                    className="w-full px-3.5 py-3 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-white outline-none"
                  >
                    {students.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400">Algebra II Score (100)</label>
                    <input 
                      type="number" 
                      value={algebraScore}
                      onChange={(e) => setAlgebraScore(e.target.value)}
                      className="w-full px-3.5 py-3 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-white outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400">Physics Theory (100)</label>
                    <input 
                      type="number" 
                      value={physicsScore}
                      onChange={(e) => setPhysicsScore(e.target.value)}
                      className="w-full px-3.5 py-3 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <button onClick={handleCalculateGrades} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-xl text-xs font-bold transition-all">
                  Compile CCE Grade Circular
                </button>
              </div>

              {calculatedCard && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/20 space-y-4 animate-fade-in shadow-xl">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <div>
                      <div className="text-xs font-extrabold text-white">{calculatedCard.name}</div>
                      <div className="text-[10px] text-zinc-500">Report Card ID: CCE-{Math.floor(Math.random()*900)}</div>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-extrabold text-sm">
                      {calculatedCard.grade}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xxs">
                    <div>
                      <span className="text-zinc-500 block font-semibold uppercase">Exam Average</span>
                      <span className="font-bold text-white text-xs">{calculatedCard.average}%</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block font-semibold uppercase">Compiled Date</span>
                      <span className="font-bold text-white text-xs">{calculatedCard.date}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex gap-3">
              <button onClick={() => setActiveDrawer(null)} className="w-full py-3 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-bold transition-all">
                Close Examinations Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. HR & PAYROLL DRAWER */}
      {activeDrawer === "hr" && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between animate-slide-in shadow-2xl">
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">HR & Faculty Payroll</div>
                  <div className="text-xxs text-zinc-400">Staff Directories & Monthly Pay Slips</div>
                </div>
              </div>
              <button onClick={() => setActiveDrawer(null)} className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="flex-1 p-5 space-y-4 overflow-y-auto">
              <div className="space-y-3.5">
                {hrStaff.map((staff, idx) => (
                  <div key={idx} className="p-4 bg-zinc-900/40 border border-zinc-850 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">{staff.name}</div>
                      <div className="text-xxs text-zinc-500 font-semibold">{staff.role}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-xs font-extrabold text-indigo-400">${staff.baseSalary.toLocaleString()}/mo</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        staff.processed 
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {staff.processed ? "Payroll Synced" : "Pending Processing"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex gap-3">
              <button 
                onClick={handleProcessPayroll}
                disabled={payrollLoading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                {payrollLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{payrollLoading ? "Processing stubs..." : "Process Monthly Payroll"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. PTA COMMUNICATIONS DRAWER */}
      {activeDrawer === "comm" && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between animate-slide-in shadow-2xl">
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-xl">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Parent circulars alerts</div>
                  <div className="text-xxs text-zinc-400">Circular Bulletins & Notice Boards</div>
                </div>
              </div>
              <button onClick={() => setActiveDrawer(null)} className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="flex-1 p-5 space-y-5 overflow-y-auto">
              <form onSubmit={handleSendCircular} className="space-y-3.5">
                <label className="text-xs font-semibold text-zinc-400">Post New School circular Bulletin</label>
                <textarea 
                  value={newBulletinText}
                  onChange={(e) => setNewBulletinText(e.target.value)}
                  rows={4}
                  placeholder="e.g. Annual Parent-Teacher Meeting is scheduled for next Friday at 2:00 PM."
                  className="w-full p-4 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-white outline-none focus:border-pink-500"
                />
                <button type="submit" className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5">
                  <Send className="h-4 w-4" />
                  <span>Publish circular Notice</span>
                </button>
              </form>

              {circularSent && (
                <div className="p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xxs font-bold text-center">
                  🔥 Bulletin successfully sent to emergency guardian lists!
                </div>
              )}

              <div className="space-y-3 border-t border-zinc-900 pt-5">
                <label className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Active Bulletins Board</label>
                <div className="space-y-3">
                  {bulletins.map(b => (
                    <div key={b.id} className="p-4 bg-zinc-900/40 border border-zinc-850 rounded-xl space-y-1.5">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="px-2 py-0.5 rounded-full bg-zinc-950 text-zinc-400 font-semibold">{b.category}</span>
                        <span className="text-zinc-500 font-semibold">{b.date}</span>
                      </div>
                      <p className="text-xs font-medium text-white leading-relaxed">{b.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex gap-3">
              <button onClick={() => setActiveDrawer(null)} className="w-full py-3 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-bold transition-all">
                Close PTA Portal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. TRANSPORT & HOSTEL ALLOCATION DRAWER */}
      {activeDrawer === "transport" && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between animate-slide-in shadow-2xl">
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl">
                  <Bus className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Transport & Hostel</div>
                  <div className="text-xxs text-zinc-400">Bus Routes & Room Occupancy Grids</div>
                </div>
              </div>
              <button onClick={() => setActiveDrawer(null)} className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="flex-1 p-5 space-y-6 overflow-y-auto">
              <div className="space-y-3.5">
                <label className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Active Bus Routes</label>
                {transportRoutes.map((bus, idx) => (
                  <div key={idx} className="p-4 bg-zinc-900/45 border border-zinc-850 rounded-xl flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-white">{bus.route}</div>
                      <div className="text-xxs text-zinc-500 font-semibold">Driver: {bus.driver} • {bus.path}</div>
                    </div>
                    <div className="text-teal-400 font-bold font-mono bg-teal-500/5 px-2.5 py-1 rounded-lg border border-teal-500/10">{bus.riders} Riders</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3.5 border-t border-zinc-900 pt-5">
                <label className="text-xs font-bold text-zinc-400 block uppercase tracking-wider">Hostel Allocations</label>
                {hostelRooms.map((room, idx) => (
                  <div key={idx} className="p-4 bg-zinc-900/45 border border-zinc-850 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-white">{room.room}</div>
                      <span className="text-[10px] text-zinc-400 font-bold bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded-full">{room.capacity}</span>
                    </div>
                    <div className="text-xxs text-zinc-500 leading-normal font-semibold">Allocated Students: <span className="text-zinc-300 font-bold">{room.occupants}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex gap-3">
              <button onClick={() => setActiveDrawer(null)} className="w-full py-3 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-bold transition-all">
                Close Transport & Hostel Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. LIBRARY & SUPPLIES INVENTORY DRAWER */}
      {activeDrawer === "library" && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between animate-slide-in shadow-2xl">
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Library & Supplies Catalog</div>
                  <div className="text-xxs text-zinc-400">Book Checkouts & Inventory Tracking</div>
                </div>
              </div>
              <button onClick={() => setActiveDrawer(null)} className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="flex-1 p-5 space-y-4 overflow-y-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 h-4 w-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search book catalog..."
                  value={bookSearch}
                  onChange={(e) => setBookSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-850 rounded-xl text-xs text-white outline-none focus:border-rose-500"
                />
              </div>

              <div className="space-y-3.5">
                {libraryBooks.filter(b => b.title.toLowerCase().includes(bookSearch.toLowerCase())).map(book => (
                  <div key={book.id} className="p-4 bg-zinc-900/40 border border-zinc-850 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">{book.title}</div>
                      <div className="text-xxs text-zinc-500 font-semibold">Author: {book.author} • Catalog ID: {book.id}</div>
                    </div>
                    <button 
                      onClick={() => handleToggleBookStatus(book.id)}
                      className={`px-3 py-1.5 rounded-lg text-xxs font-bold transition-all cursor-pointer ${
                        book.status === "Available"
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                      }`}
                    >
                      {book.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex gap-3">
              <button onClick={() => setActiveDrawer(null)} className="w-full py-3 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs font-bold transition-all">
                Close Library Catalog
              </button>
            </div>
          </div>
        </div>
      )}

    </NavigationShell>
  );
}
