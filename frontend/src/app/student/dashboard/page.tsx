"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavigationShell from "@/components/NavigationShell";
import { 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Award, 
  CheckCircle, 
  MessageSquare, 
  Loader2, 
  Send,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingUp
} from "lucide-react";

export default function StudentDashboard() {
  const router = useRouter();
  
  // Dynamic API Student State - pre-populated for instant responsive rendering
  const [student, setStudent] = useState<any>({
    id: "MM-232",
    firstName: "Martin",
    lastName: "Mutooro",
    classLevel: "Grade 10-A",
    rollNo: 23,
    gpa: 3.82,
    attendance: "96.4%",
    outstandingFees: 150.00,
    academicYear: "2026-27"
  });
  
  // Interactive States
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", text: "Hi Martin! I am your Genkit School ERP study buddy. Ask me anything about your grades, schedule, or study resources!" }
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [feeStatus, setFeeStatus] = useState("Pending"); // "Pending" | "Processing" | "Paid"

  // Fetch Student Data from Node.js Cloud Function if online
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        console.log("Fetching student profile from Cloud Functions...");
        const response = await fetch("http://localhost:5001/schoolerp-ba756/us-central1/getStudentData");
        const data = await response.json();
        if (data && data.success) {
          setStudent(data.student);
          console.log("🔥 Successfully loaded student data from Cloud Function!", data.student);
        }
      } catch (err) {
        console.warn("⚠️ Could not connect to local Cloud Functions emulator. Using high-fidelity local states.", err);
      }
    };

    fetchStudentData();
  }, []);

  const handlePayFee = () => {
    setFeeStatus("Processing");
    setTimeout(() => {
      setFeeStatus("Paid");
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatMessage("");
    setAiLoading(true);

    // Simulate AI response based on questions
    setTimeout(() => {
      let aiResponse = "I can definitely help with that! In your Grade 10 curriculum, we recommend dedicating 2 hours per week to extra reading in Physics and using the study plans available in the library.";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("grade") || lower.includes("marks") || lower.includes("report")) {
        aiResponse = `Your highest mark is currently in Algebra (94% - Grade A). You're doing excellent! Your current cumulative GPA is ${student ? student.gpa : "3.82"}. Keep pushing!`;
      } else if (lower.includes("time") || lower.includes("schedule") || lower.includes("tomorrow")) {
        aiResponse = "Tomorrow is Tuesday! Your day starts at 8:30 AM with English Literature in Room 104, followed by Chemistry Lab at 10:15 AM. Don't forget your lab coat!";
      } else if (lower.includes("fee") || lower.includes("pay")) {
        aiResponse = `Your outstanding Term 3 tuition fees are $${student ? student.outstandingFees.toFixed(2) : "150.00"}. You can pay directly from this dashboard using the 'Pay Fee Now' button!`;
      }

      setChatHistory(prev => [...prev, { sender: "ai", text: aiResponse }]);
      setAiLoading(false);
    }, 1500);
  };

  // Dashboard Data Mockups
  const timetable: any = {
    Monday: [
      { time: "08:30 AM - 09:45 AM", subject: "Algebra II", room: "Room 302", teacher: "Mrs. Sharma", color: "border-violet-500/30 text-violet-400 bg-violet-500/5" },
      { time: "10:15 AM - 11:30 AM", subject: "World History", room: "Room 109", teacher: "Mr. Kapoor", color: "border-amber-500/30 text-amber-400 bg-amber-500/5" },
      { time: "12:30 PM - 01:45 PM", subject: "Physics Theory", room: "Lab 2", teacher: "Dr. Bhatia", color: "border-sky-500/30 text-sky-400 bg-sky-500/5" },
    ],
    Tuesday: [
      { time: "08:30 AM - 09:45 AM", subject: "English Literature", room: "Room 104", teacher: "Mrs. Verma", color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
      { time: "10:15 AM - 11:30 AM", subject: "Chemistry Lab", room: "Lab 1", teacher: "Mr. Saxena", color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" },
      { time: "01:00 PM - 02:15 PM", subject: "Physical Education", room: "Gymnasium", teacher: "Coach Jaggi", color: "border-rose-500/30 text-rose-400 bg-rose-500/5" },
    ],
    Wednesday: [
      { time: "08:30 AM - 09:45 AM", subject: "Algebra II", room: "Room 302", teacher: "Mrs. Sharma", color: "border-violet-500/30 text-violet-400 bg-violet-500/5" },
      { time: "10:15 AM - 11:30 AM", subject: "World History", room: "Room 109", teacher: "Mr. Kapoor", color: "border-amber-500/30 text-amber-400 bg-amber-500/5" },
      { time: "12:30 PM - 01:45 PM", subject: "Computer Programming", room: "IT Lab", teacher: "Ms. Das", color: "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/5" },
    ],
    Thursday: [
      { time: "08:30 AM - 09:45 AM", subject: "English Literature", room: "Room 104", teacher: "Mrs. Verma", color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/5" },
      { time: "10:15 AM - 11:30 AM", subject: "Physics Theory", room: "Lab 2", teacher: "Dr. Bhatia", color: "border-sky-500/30 text-sky-400 bg-sky-500/5" },
      { time: "01:00 PM - 02:15 PM", subject: "Chemistry Theory", room: "Room 205", teacher: "Mr. Saxena", color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5" },
    ],
    Friday: [
      { time: "08:30 AM - 09:45 AM", subject: "Computer Programming", room: "IT Lab", teacher: "Ms. Das", color: "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/5" },
      { time: "10:15 AM - 11:30 AM", subject: "Algebra II", room: "Room 302", teacher: "Mrs. Sharma", color: "border-violet-500/30 text-violet-400 bg-violet-500/5" },
      { time: "12:30 PM - 01:45 PM", subject: "Music & Art", room: "Auditorium", teacher: "Ms. Roy", color: "border-pink-500/30 text-pink-400 bg-pink-500/5" },
    ]
  };

  const reportCard = [
    { subject: "Algebra II", marks: "94 / 100", grade: "A", teacher: "Mrs. Sharma", remarks: "Exceptional algebraic solver. Keep it up!" },
    { subject: "Physics Theory", marks: "88 / 100", grade: "A-", teacher: "Dr. Bhatia", remarks: "Great analytical skills in mechanics." },
    { subject: "World History", marks: "91 / 100", grade: "A", teacher: "Mr. Kapoor", remarks: "Deep comprehension of global milestones." },
    { subject: "English Literature", marks: "85 / 100", grade: "B+", teacher: "Mrs. Verma", remarks: "Creative writer, improve critical analysis." },
    { subject: "Chemistry Theory", marks: "78 / 100", grade: "B-", teacher: "Mr. Saxena", remarks: "Need extra effort in organic bonding." }
  ];

  return (
    <NavigationShell requiredRole="student">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none z-0"></div>

      {/* Main Content Layout */}
      <main className="p-6 md:p-8 space-y-8 relative z-10 flex-1">
        
        {/* Profile Card & Greetings */}
        <div className="bg-gradient-to-r from-zinc-900/60 via-zinc-900/40 to-transparent border border-zinc-800 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 flex-col md:flex-row text-center md:text-left">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-500 p-0.5 shadow-xl shadow-indigo-500/10">
              <div className="h-full w-full rounded-[14px] bg-zinc-950 flex items-center justify-center text-white">
                <span className="font-extrabold text-2xl tracking-wider text-indigo-400">
                  {student.firstName[0]}{student.lastName[0]}
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Welcome back, {student.firstName}!
              </h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xxs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-semibold">
                  {student.classLevel}
                </span>
                <span className="text-xxs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-semibold">
                  Roll Number #{student.rollNo}
                </span>
                <span className="text-xxs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                  Session {student.academicYear}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 hover:text-white px-4.5 py-2.5 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-indigo-500/5"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>AI Study Copilot</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* GPA Card */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Academic Grade</span>
              <Award className="h-5 w-5 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold text-white">{student.gpa}</div>
              <div className="text-xs text-zinc-500 font-semibold">/ 4.0 GPA</div>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-1.5 border border-zinc-900">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "94%" }}></div>
            </div>
            <div className="text-xxs text-zinc-500 font-medium flex items-center gap-1.5">
              <TrendingUp className="h-3 w-3 text-emerald-400" /> Top 5% of Grade Level
            </div>
          </div>

          {/* Attendance Card */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Attendance Rate</span>
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold text-white">{student.attendance}</div>
              <div className="text-xs text-zinc-500 font-semibold">Current Term</div>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-1.5 border border-zinc-900">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "96.4%" }}></div>
            </div>
            <div className="text-xxs text-zinc-500 font-medium">164 out of 170 days attended</div>
          </div>

          {/* Fees Due Card */}
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-between gap-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Pending Dues</span>
                <DollarSign className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-extrabold text-white">
                  {feeStatus === "Paid" ? "$0.00" : `$${student.outstandingFees.toFixed(2)}`}
                </div>
                <div className="text-xs text-zinc-500 font-semibold">Tuition Term 3</div>
              </div>
            </div>

            {feeStatus === "Pending" && (
              <button 
                onClick={handlePayFee}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Pay Fee Now</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}

            {feeStatus === "Processing" && (
              <div className="w-full py-2 rounded-xl bg-zinc-850 border border-zinc-800 text-zinc-400 text-xs font-semibold flex items-center justify-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Processing Payment...</span>
              </div>
            )}

            {feeStatus === "Paid" && (
              <div className="w-full py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Tuition Fees Paid</span>
              </div>
            )}
          </div>

          {/* Study Companion Alert */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-zinc-900/50 border border-indigo-900/30 p-6 rounded-2xl flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">ERP AI Copilot</span>
                <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
              </div>
              <p className="text-zinc-400 text-xxs leading-relaxed">
                Unlock instant study assistant tips, syllabus outlines, and prep guides generated via Gemini.
              </p>
            </div>
            <button 
              onClick={() => setChatOpen(true)}
              className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Launch Companion</span>
            </button>
          </div>
        </div>

        {/* Timetable Grid & Detailed Report Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Weekly Timetable Card */}
          <div className="lg:col-span-1 bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <Calendar className="h-4.5 w-4.5 text-indigo-400" /> Class Schedule
              </h3>
              <p className="text-zinc-500 text-xs">Verify your classrooms and course timings.</p>
            </div>

            {/* Day Selector Buttons */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {Object.keys(timetable).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 text-xxs font-semibold rounded-lg transition-all cursor-pointer shrink-0 ${
                    selectedDay === day 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                      : "bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-900"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>

            {/* Timetable Courses List */}
            <div className="space-y-4 pt-1">
              {timetable[selectedDay].map((course: any, idx: number) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border flex items-start gap-4 transition-all ${course.color}`}
                >
                  <Clock className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white">{course.subject}</div>
                    <div className="text-xxs text-zinc-400 font-medium flex items-center gap-2">
                      <span>{course.time}</span>
                      <span>•</span>
                      <span className="text-zinc-300 font-semibold">{course.room}</span>
                    </div>
                    <div className="text-xxs text-zinc-500 font-semibold">Instructor: {course.teacher}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Report Card Table */}
          <div className="lg:col-span-2 bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="h-4.5 w-4.5 text-sky-400" /> Academic Report Card
              </h3>
              <p className="text-zinc-500 text-xs">Internal marks records and grading performance assessments.</p>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800/80 text-zinc-400 text-xxs font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-semibold">Subject</th>
                    <th className="pb-3 px-4 font-semibold">Internal Score</th>
                    <th className="pb-3 px-4 font-semibold text-center">Grade</th>
                    <th className="pb-3 pl-4 font-semibold">Instructor Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/50">
                  {reportCard.map((card, index) => (
                    <tr key={index} className="text-xs hover:bg-zinc-900/30 transition-all">
                      <td className="py-3.5 pr-4 font-bold text-zinc-100">{card.subject}</td>
                      <td className="py-3.5 px-4 text-zinc-300 font-medium">{card.marks}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-xxs ${
                          card.grade.startsWith("A") 
                            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                            : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                        }`}>
                          {card.grade}
                        </span>
                      </td>
                      <td className="py-3.5 pl-4 text-zinc-400 text-xxs leading-relaxed font-semibold italic">{card.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>

      {/* AI STUDY COMPANION FLOATING DRAWER */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between animate-slide-in shadow-2xl">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-violet-600 text-white shadow-md shadow-amber-500/10">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Study Companion AI</div>
                  <div className="text-xxs text-zinc-400">Powered by Vertex AI & Genkit</div>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Chat History List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {chatHistory.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-normal font-medium ${
                    msg.sender === "user" 
                      ? "bg-indigo-600 text-white rounded-br-none" 
                      : "bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {aiLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-855 p-3 rounded-2xl rounded-bl-none flex items-center gap-2 text-zinc-400 text-xs">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-900 bg-zinc-950">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  placeholder="Ask about your grades, schedule, or syllabus..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 bg-zinc-900 border border-zinc-850 hover:border-zinc-700 focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 rounded-2xl text-xs text-white transition-all outline-none"
                />
                <button 
                  type="submit"
                  className="absolute right-2 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </NavigationShell>
  );
}
