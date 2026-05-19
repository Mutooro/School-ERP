"use client";

import React, { useState } from "react";
import NavigationShell from "@/components/NavigationShell";
import { 
  Users, 
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
  TrendingUp,
  FileText
} from "lucide-react";

export default function ParentDashboard() {
  
  // High-fidelity Child State
  const childInfo = {
    name: "Martin Mutooro",
    classLevel: "Grade 10-A",
    rollNo: 23,
    gpa: 3.82,
    attendance: "96.4%",
    outstandingFees: 150.00,
    academicYear: "2026-27",
    mentor: "Mrs. Sharma (Math Lead)"
  };

  // Academic assessment summaries
  const childGrades = [
    { subject: "Algebra II", marks: "94 / 100", grade: "A", remarks: "Exceptional algebraic solver." },
    { subject: "Physics Theory", marks: "88 / 100", grade: "A-", remarks: "Great analytical skills." },
    { subject: "World History", marks: "91 / 100", grade: "A", remarks: "Deep historical interest." },
    { subject: "English Literature", marks: "85 / 100", grade: "B+", remarks: "Creative and descriptive writer." }
  ];

  // Circular bulletins published
  const bulletins = [
    { id: 1, title: "Algebra Chapter 4 Homework due on Friday", date: "2026-05-19", sender: "Mrs. Sharma" },
    { id: 2, title: "Term 3 Examination Timetable Published", date: "2026-05-18", sender: "System Admin" },
    { id: 3, title: "Annual Sports Meet Rescheduled to June", date: "2026-05-15", sender: "System Admin" }
  ];

  // Interactive states
  const [feeStatus, setFeeStatus] = useState("Pending"); // "Pending" | "Processing" | "Paid"
  const [mentorMessage, setMentorMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handlePayFee = () => {
    setFeeStatus("Processing");
    setTimeout(() => {
      setFeeStatus("Paid");
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorMessage.trim()) return;

    // Simulate sending message to mentor
    setMessageSent(true);
    setMentorMessage("");
    setTimeout(() => setMessageSent(false), 4000);
  };

  return (
    <NavigationShell requiredRole="parent">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-pink-600/5 blur-[120px] pointer-events-none z-0"></div>

      <main className="p-6 md:p-8 space-y-8 relative z-10 flex-1">
        
        {/* Child Profile summary */}
        <div className="bg-gradient-to-r from-zinc-900/60 via-zinc-900/40 to-transparent border border-zinc-800 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 flex-col md:flex-row text-center md:text-left">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 p-0.5 shadow-xl shadow-pink-500/10">
              <div className="h-full w-full rounded-[14px] bg-zinc-950 flex items-center justify-center text-white">
                <span className="font-extrabold text-2xl tracking-wider text-pink-400">
                  {childInfo.name.split(" ").map(w => w[0]).join("")}
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-550 block">Ward Profile Details</span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {childInfo.name}
              </h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xxs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-semibold">
                  Class: {childInfo.classLevel}
                </span>
                <span className="text-xxs px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-semibold">
                  Roll Number #{childInfo.rollNo}
                </span>
                <span className="text-xxs px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-semibold">
                  Primary Mentor: {childInfo.mentor}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Child performance parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* GPA Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Cumulative GPA</span>
              <Award className="h-5 w-5 text-pink-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold text-white">{childInfo.gpa}</div>
              <div className="text-xs text-zinc-500 font-semibold">/ 4.0 GPA</div>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-1.5 border border-zinc-900">
              <div className="bg-pink-500 h-1.5 rounded-full" style={{ width: "94%" }}></div>
            </div>
            <div className="text-xxs text-zinc-500 font-medium flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Academic Class Standing: Excellent
            </div>
          </div>

          {/* Attendance Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Attendance Rate</span>
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold text-white">{childInfo.attendance}</div>
              <div className="text-xs text-zinc-500 font-semibold">Term Average</div>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-1.5 border border-zinc-900">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "96.4%" }}></div>
            </div>
            <div className="text-xxs text-zinc-500 font-medium">No unauthorized leaves recorded.</div>
          </div>

          {/* Tuition Outstanding Fees Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between gap-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Outstanding Dues</span>
                <DollarSign className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-extrabold text-white">
                  {feeStatus === "Paid" ? "$0.00" : `$${childInfo.outstandingFees.toFixed(2)}`}
                </div>
                <div className="text-xs text-zinc-500 font-semibold">Tuition fees Term 3</div>
              </div>
            </div>

            {feeStatus === "Pending" && (
              <button 
                onClick={handlePayFee}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Pay Fee Online</span>
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
                <span>Fees Cleared</span>
              </div>
            )}
          </div>

          {/* School Contact Widget */}
          <div className="bg-gradient-to-br from-pink-900/20 to-zinc-900/50 border border-pink-900/30 p-6 rounded-2xl flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Direct Mentor Line</span>
                <MessageSquare className="h-5 w-5 text-pink-400" />
              </div>
              <p className="text-zinc-400 text-xxs leading-relaxed">
                Send an encrypted query regarding academic progress or leave requests directly to the mentor.
              </p>
            </div>
            <a 
              href="#mentor-contact-box"
              className="w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition-all text-center block cursor-pointer"
            >
              Compose Query Message
            </a>
          </div>
        </div>

        {/* Academic Details & Bulletins */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Report Card */}
          <div className="lg:col-span-2 bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-pink-400" /> Report Card Marks Summary
              </h3>
              <p className="text-zinc-500 text-xs">Verify current terms grading performance registers.</p>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800/80 text-zinc-400 text-xxs font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-semibold">Course Subject</th>
                    <th className="pb-3 px-4 font-semibold">Marks Score</th>
                    <th className="pb-3 px-4 font-semibold text-center">Grade</th>
                    <th className="pb-3 pl-4 font-semibold">Teacher Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/50">
                  {childGrades.map((card, idx) => (
                    <tr key={idx} className="text-xs hover:bg-zinc-900/30 transition-all">
                      <td className="py-3.5 pr-4 font-bold text-zinc-100">{card.subject}</td>
                      <td className="py-3.5 px-4 text-zinc-300 font-medium">{card.marks}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-xxs bg-pink-500/10 border border-pink-500/20 text-pink-450`}>
                          Grade {card.grade}
                        </span>
                      </td>
                      <td className="py-3.5 pl-4 text-zinc-400 text-xxs leading-relaxed font-semibold italic">{card.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notices Bulletins */}
          <div className="lg:col-span-1 bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-pink-400" /> Active School Announcements
              </h3>
              <p className="text-zinc-500 text-xs">Stay updated with classroom and campus events.</p>
            </div>

            <div className="space-y-4">
              {bulletins.map((bulletin) => (
                <div key={bulletin.id} className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500">
                    <span>{bulletin.sender}</span>
                    <span>{bulletin.date}</span>
                  </div>
                  <p className="font-medium text-white leading-relaxed">{bulletin.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Mentor Form Box */}
        <div id="mentor-contact-box" className="bg-zinc-900/55 border border-zinc-800 p-6 rounded-3xl max-w-xl mx-auto space-y-5">
          <div className="space-y-1 text-center">
            <h3 className="text-base font-extrabold text-white flex items-center justify-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-pink-400" /> Contact Class Mentor
            </h3>
            <p className="text-zinc-550 text-xxs">Compose and dispatch queries to {childInfo.mentor}.</p>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <textarea
              required
              rows={4}
              placeholder="e.g. Hello Mrs. Sharma, I wanted to inquire about Martin's upcoming algebra project rubric details..."
              value={mentorMessage}
              onChange={(e) => setMentorMessage(e.target.value)}
              className="w-full p-4 bg-zinc-950 border border-zinc-850 hover:border-zinc-700 focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/30 rounded-2xl text-xs text-white outline-none transition-all resize-none"
            />

            <button 
              type="submit"
              className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>Send Secure Message</span>
            </button>
          </form>

          {messageSent && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 rounded-2xl text-xxs font-semibold text-center animate-fade-in">
              🚀 Message successfully dispatched and synced with the mentor dashboard!
            </div>
          )}
        </div>

      </main>
    </NavigationShell>
  );
}
