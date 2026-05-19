"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavigationShell from "@/components/NavigationShell";
import { 
  Users, 
  Calendar, 
  Award, 
  Plus, 
  Check, 
  Search, 
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Send
} from "lucide-react";

export default function TeacherDashboard() {
  const router = useRouter();

  // Active Teacher Profile State
  const teacherInfo = {
    name: "Mrs. Sharma",
    role: "Mathematics Lead & Class Mentor",
    assignedClass: "Grade 10-A",
    weeklyHours: 18,
    room: "Room 302"
  };

  // Student list for Mentored Class
  const [students, setStudents] = useState([
    { rollNo: 1, name: "Aarav Sharma", algebraGrade: "A", status: "Present" },
    { rollNo: 7, name: "Rohan Kapoor", algebraGrade: "A-", status: "Present" },
    { rollNo: 12, name: "Sneha Patel", algebraGrade: "B+", status: "Absent" },
    { rollNo: 19, name: "Ananya Sen", algebraGrade: "B", status: "Late" },
    { rollNo: 23, name: "Martin Mutooro", algebraGrade: "A", status: "Present" },
  ]);

  // Timetable taught by this teacher
  const schedule = [
    { time: "08:30 AM - 09:45 AM", subject: "Algebra II (Grade 10-A)", room: "Room 302", type: "Lecture" },
    { time: "10:15 AM - 11:30 AM", subject: "Advanced Math (Grade 11-B)", room: "Room 201", type: "Lecture" },
    { time: "12:30 PM - 01:45 PM", subject: "Math Lab (Grade 10-A)", room: "Lab 3", type: "Practical" },
  ];

  // Grading states
  const [selectedStudent, setSelectedStudent] = useState("Martin Mutooro");
  const [inputMarks, setInputMarks] = useState("95");
  const [remarks, setRemarks] = useState("Outstanding homework consistency.");
  const [cceHistory, setCceHistory] = useState<any[]>([
    { name: "Martin Mutooro", marks: 94, grade: "A", date: "2026-05-18", remarks: "Excellent algebra solving capabilities." }
  ]);

  // Circular notices states
  const [newNotice, setNewNotice] = useState("");
  const [notices, setNotices] = useState([
    { id: 1, title: "Algebra Chapter 4 Homework due on Friday", date: "2026-05-19" },
    { id: 2, title: "Mock Exams for Grade 10 to start from June 1st", date: "2026-05-15" }
  ]);
  const [noticeSent, setNoticeSent] = useState(false);

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMarks) return;

    const score = parseInt(inputMarks);
    let lGrade = "F";
    if (score >= 90) lGrade = "A";
    else if (score >= 80) lGrade = "B";
    else if (score >= 70) lGrade = "C";

    const record = {
      name: selectedStudent,
      marks: score,
      grade: lGrade,
      date: new Date().toISOString().split("T")[0],
      remarks
    };

    setCceHistory(prev => [record, ...prev]);

    // Update grade in local roster
    setStudents(prev => prev.map(s => 
      s.name === selectedStudent ? { ...s, algebraGrade: lGrade } : s
    ));

    setInputMarks("");
    setRemarks("");
    alert(`CCE grade registered successfully for ${selectedStudent}!`);
  };

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.trim()) return;

    setNotices(prev => [{
      id: Date.now(),
      title: newNotice,
      date: new Date().toISOString().split("T")[0]
    }, ...prev]);

    setNewNotice("");
    setNoticeSent(true);
    setTimeout(() => setNoticeSent(false), 3000);
  };

  return (
    <NavigationShell requiredRole="teacher">
      <main className="p-6 md:p-8 space-y-8 animate-fade-in relative z-10 flex-1">
        
        {/* Mentor Info Header */}
        <div className="bg-gradient-to-r from-zinc-900/60 via-zinc-900/40 to-transparent border border-zinc-800 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 flex-col md:flex-row text-center md:text-left">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-xl shadow-amber-500/10">
              <div className="h-full w-full rounded-[14px] bg-zinc-950 flex items-center justify-center text-white">
                <span className="font-extrabold text-2xl tracking-wider text-amber-400">
                  {teacherInfo.name.split(" ").map(w => w[0]).join("")}
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Welcome back, {teacherInfo.name}!
              </h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xxs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-semibold">
                  {teacherInfo.role}
                </span>
                <span className="text-xxs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-semibold">
                  Primary Mentor: {teacherInfo.assignedClass}
                </span>
                <span className="text-xxs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
                  {teacherInfo.weeklyHours} Taught Hours/wk
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => router.push("/admin/attendance")}
            className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 px-4.5 py-2.5 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/15"
          >
            <Calendar className="h-4 w-4" />
            <span>Launch Attendance Register</span>
          </button>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xxs font-bold text-zinc-500 uppercase tracking-wider">Mentored Class</div>
              <div className="text-xl font-extrabold text-white">{teacherInfo.assignedClass}</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-400">
              <Users className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xxs font-bold text-zinc-500 uppercase tracking-wider">Taught Classroom</div>
              <div className="text-xl font-extrabold text-white">{teacherInfo.room}</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Clock className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xxs font-bold text-zinc-500 uppercase tracking-wider">Today's Class Attendance</div>
              <div className="text-xl font-extrabold text-emerald-400">80% <span className="text-xs text-zinc-500 font-semibold">(4/5 Present)</span></div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Check className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xxs font-bold text-zinc-500 uppercase tracking-wider">Pending Gradings</div>
              <div className="text-xl font-extrabold text-white">0 Assessments</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-violet-500/5 border border-violet-500/10 flex items-center justify-center text-violet-400">
              <Award className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Schedule & Student Roster */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Lecture Timetable */}
          <div className="lg:col-span-1 bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-amber-400" /> Teaching Timetable
              </h3>
              <p className="text-zinc-500 text-xs">Verify your assigned sessions and room slots.</p>
            </div>

            <div className="space-y-4">
              {schedule.map((course, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 flex gap-4 transition-all">
                  <Clock className="h-5 w-5 shrink-0 mt-0.5 text-zinc-400" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white">{course.subject}</div>
                    <div className="text-xxs text-zinc-400 font-medium flex items-center gap-2">
                      <span>{course.time}</span>
                      <span>•</span>
                      <span className="text-amber-400 font-bold">{course.room}</span>
                    </div>
                    <div className="text-xxs text-zinc-500 font-semibold">Slot Mode: {course.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Roster Marks Overview */}
          <div className="lg:col-span-2 bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-indigo-400" /> Mentored Student Roster ({teacherInfo.assignedClass})
              </h3>
              <p className="text-zinc-500 text-xs">Access student status reviews and current grade standings.</p>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800/80 text-zinc-400 text-xxs font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-semibold">Roll No</th>
                    <th className="pb-3 px-4 font-semibold">Student Name</th>
                    <th className="pb-3 px-4 font-semibold text-center">Algebra II Grade</th>
                    <th className="pb-3 pl-4 font-semibold">Today's Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/50">
                  {students.map((student) => (
                    <tr key={student.rollNo} className="text-xs hover:bg-zinc-900/30 transition-all">
                      <td className="py-3.5 pr-4 font-bold text-zinc-500">#{student.rollNo}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{student.name}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-md font-bold text-xxs bg-amber-500/10 border border-amber-500/20 text-amber-400">
                          Grade {student.algebraGrade}
                        </span>
                      </td>
                      <td className="py-3.5 pl-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          student.status === "Present" 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : student.status === "Absent"
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              : "bg-orange-500/10 text-orange-450 border border-orange-500/20"
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Grading Form & Class Notice Board */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CCE Rubrics Compiler */}
          <div className="bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-amber-400" /> CCE Rubric Grading Tool
              </h3>
              <p className="text-zinc-500 text-xs">Submit marks summaries directly to the student academic report cards.</p>
            </div>

            <form onSubmit={handleGradeSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Select Student</label>
                <select 
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-3.5 py-3 bg-zinc-950 border border-zinc-850 rounded-xl text-xs text-white outline-none"
                >
                  {students.map(s => <option key={s.rollNo} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Term 3 Algebra Marks (Max 100)</label>
                <input 
                  type="number"
                  placeholder="e.g. 94"
                  value={inputMarks}
                  onChange={(e) => setInputMarks(e.target.value)}
                  required
                  className="w-full px-3.5 py-3 bg-zinc-950 border border-zinc-850 rounded-xl text-xs text-white outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Instructor Feedback Remarks</label>
                <textarea 
                  placeholder="Provide brief comment..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={2}
                  className="w-full p-3.5 bg-zinc-950 border border-zinc-850 focus:border-amber-500 rounded-xl text-xs text-white outline-none resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Compile and Publish Grade
              </button>
            </form>

            {/* Compiled Grade Records History */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <label className="text-xxs font-bold text-zinc-500 uppercase tracking-wider block">Recently Compiled Submissions</label>
              <div className="space-y-2.5">
                {cceHistory.map((h, i) => (
                  <div key={i} className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-between text-xxs">
                    <div className="space-y-1">
                      <span className="font-bold text-white block">{h.name}</span>
                      <span className="text-zinc-500 italic block">"{h.remarks}"</span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="font-extrabold text-amber-400 block">{h.marks}% ({h.grade})</span>
                      <span className="text-zinc-500 block">{h.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Class Notice Bulletin Poster */}
          <div className="bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-pink-400" /> Class Notice Board
              </h3>
              <p className="text-zinc-500 text-xs">Publish bulletin announcements for class students & guardians.</p>
            </div>

            <form onSubmit={handlePostNotice} className="space-y-4">
              <textarea 
                value={newNotice}
                onChange={(e) => setNewNotice(e.target.value)}
                rows={4}
                required
                placeholder="e.g. Bring physics workbook tomorrow for class practice session."
                className="w-full p-3.5 bg-zinc-950 border border-zinc-850 focus:border-pink-500 rounded-xl text-xs text-white outline-none resize-none"
              />

              <button 
                type="submit" 
                className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="h-4 w-4" />
                <span>Post Bulletin Announcement</span>
              </button>
            </form>

            {noticeSent && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xxs font-bold text-center">
                🎉 Bulletin successfully published to Notice Board!
              </div>
            )}

            {/* List */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <label className="text-xxs font-bold text-zinc-500 uppercase tracking-wider block">Notice Bulletin History</label>
              <div className="space-y-3">
                {notices.map(n => (
                  <div key={n.id} className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-1 text-xs">
                    <span className="text-zinc-550 text-[10px] block font-bold">{n.date}</span>
                    <p className="font-medium text-white leading-relaxed">{n.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </main>
    </NavigationShell>
  );
}
