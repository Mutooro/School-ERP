"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { 
  GraduationCap, 
  ArrowLeft, 
  Loader2, 
  DollarSign, 
  Plus, 
  Check, 
  Search, 
  TrendingUp, 
  AlertCircle,
  FileText,
  CreditCard,
  Briefcase,
  Layers,
  Sparkles
} from "lucide-react";

export default function FeesPortal() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Dynamic Financial Data States
  const [feeHeads, setFeeHeads] = useState([
    { id: 1, name: "Tuition Fee Term 3", amount: 150.00, frequency: "Per Term" },
    { id: 2, name: "Library Access Pass", amount: 25.00, frequency: "Annual" },
    { id: 3, name: "Computer Lab Fee", amount: 40.00, frequency: "Per Term" },
    { id: 4, name: "Transport Route A", amount: 60.00, frequency: "Monthly" },
  ]);

  const [receipts, setReceipts] = useState([
    { id: "REC-940", studentName: "Martin Mutooro", rollNo: 23, feeHead: "Tuition Fee Term 3", amount: 150.00, date: "2026-05-18", method: "Online" },
    { id: "REC-939", studentName: "Sneha Patel", rollNo: 12, feeHead: "Computer Lab Fee", amount: 40.00, date: "2026-05-17", method: "Cash" },
    { id: "REC-938", studentName: "Aarav Sharma", rollNo: 1, feeHead: "Tuition Fee Term 3", amount: 150.00, date: "2026-05-16", method: "Cheque" },
    { id: "REC-937", studentName: "Ananya Sen", rollNo: 19, feeHead: "Library Access Pass", amount: 25.00, date: "2026-05-15", method: "Bank Transfer" },
  ]);

  // Form inputs
  const [newFeeName, setNewFeeName] = useState("");
  const [newFeeAmount, setNewFeeAmount] = useState("");
  const [newFeeFrequency, setNewFeeFrequency] = useState("Per Term");

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [selectedFeeHead, setSelectedFeeHead] = useState("Tuition Fee Term 3");
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("Online");

  const [searchQuery, setSearchQuery] = useState("");

  // UI States
  const [isAddingReceipt, setIsAddingReceipt] = useState(false);
  const [recording, setRecording] = useState(false);
  const [syncStatus, setSyncStatus] = useState(false);

  // Auth Protection Guard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch Financial Analytics from Cloud Functions
  useEffect(() => {
    const fetchFeesSummary = async () => {
      try {
        console.log("Fetching financial ledgers from Cloud Functions...");
        const response = await fetch("http://localhost:5001/schoolerp-ba756/us-central1/getFeesSummary");
        const data = await response.json();
        if (data && data.success) {
          // Expose loaded collection state
          console.log("🔥 Successfully loaded financial summary!", data);
        }
      } catch (err) {
        console.warn("⚠️ Local Cloud Function offline. Using high-fidelity fallback states.", err);
      }
    };
    fetchFeesSummary();
  }, []);

  // Handle adding a new fee head configuration
  const handleAddFeeHead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeeName || !newFeeAmount) return;

    const newHead = {
      id: Date.now(),
      name: newFeeName,
      amount: parseFloat(newFeeAmount),
      frequency: newFeeFrequency
    };

    setFeeHeads(prev => [...prev, newHead]);
    setNewFeeName("");
    setNewFeeAmount("");
  };

  // Handle creating a new payment receipt
  const handleRecordReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !payAmount) return;

    setRecording(true);
    setSyncStatus(false);

    const newReceipt = {
      id: `REC-${Math.floor(100 + Math.random() * 900)}`,
      studentName,
      rollNo: parseInt(studentId) || Math.floor(Math.random() * 30),
      feeHead: selectedFeeHead,
      amount: parseFloat(payAmount),
      date: new Date().toISOString().split("T")[0],
      method: payMethod
    };

    try {
      // POST receipt record to Node.js Cloud Function
      const response = await fetch("http://localhost:5001/schoolerp-ba756/us-central1/recordPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReceipt)
      });
      const data = await response.json();
      if (data && data.success) {
        setSyncStatus(true);
      }
    } catch (err) {
      console.warn("⚠️ Node.js API offline. Fallback to saving in local component state.", err);
    }

    // Add to local state anyway for immediate premium client responsiveness
    setReceipts(prev => [newReceipt, ...prev]);
    setRecording(false);
    setIsAddingReceipt(false);
    
    // Reset form
    setStudentId("");
    setStudentName("");
    setPayAmount("");
  };

  // Filter receipts based on search query
  const filteredReceipts = receipts.filter(rec => 
    rec.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.feeHead.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Math Analytics
  const totalCollections = receipts.reduce((sum, r) => sum + r.amount, 0) + 42425; // added base balance
  const pendingDues = 8120.00;
  const collectionTargetPercent = 94;

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
          <p className="text-zinc-400 font-medium">Opening Financial Ledger...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/35 pb-20 relative">
      <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-600/5 blur-[120px] pointer-events-none"></div>

      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push("/")}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white font-bold">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-base text-white">Fee & Accounts Manager</span>
              <span className="ml-2 text-xxs text-zinc-500">Finance & Collections</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddingReceipt(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4.5 py-2 text-sm font-bold transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            <Plus className="h-4 w-4" />
            <span>Create Fee Receipt</span>
          </button>
        </div>
      </nav>

      {/* Main Body Grid */}
      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        {/* Core Financial Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xxs font-bold text-zinc-500 uppercase tracking-wider">Total collections</div>
              <div className="text-2xl font-extrabold text-white">${totalCollections.toLocaleString()}</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xxs font-bold text-zinc-500 uppercase tracking-wider">Outstanding Dues</div>
              <div className="text-2xl font-extrabold text-rose-400">${pendingDues.toLocaleString()}</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-center text-rose-400">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xxs font-bold text-zinc-500 uppercase tracking-wider">Active Ledgers</div>
              <div className="text-2xl font-extrabold text-white">1,248 Students</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-violet-500/5 border border-violet-500/10 flex items-center justify-center text-violet-400">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xxs font-bold text-zinc-500 uppercase tracking-wider">Budget Target</div>
              <div className="text-2xl font-extrabold text-teal-400">{collectionTargetPercent}% Reached</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-teal-500/5 border border-teal-500/10 flex items-center justify-center text-teal-400">
              <Layers className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Dynamic configurations & Receipts Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Fee Heads configurator panel */}
          <div className="lg:col-span-1 bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-3xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Layers className="h-4.5 w-4.5 text-emerald-400" /> Active Fee Heads
              </h3>
              <p className="text-zinc-500 text-xs">Configure the base structures for school charges.</p>
            </div>

            {/* List */}
            <div className="space-y-3.5">
              {feeHeads.map(head => (
                <div key={head.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white">{head.name}</div>
                    <div className="text-xxs text-zinc-500 font-semibold">{head.frequency}</div>
                  </div>
                  <div className="text-sm font-extrabold text-emerald-400">${head.amount.toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Add inline form */}
            <form onSubmit={handleAddFeeHead} className="space-y-4 border-t border-zinc-900 pt-5">
              <h4 className="text-xxs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                <Plus className="h-3 w-3" /> Add Fee Category
              </h4>
              
              <div className="space-y-3">
                <input 
                  type="text"
                  placeholder="e.g. Science Lab Fee"
                  value={newFeeName}
                  onChange={(e) => setNewFeeName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-850 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 rounded-xl text-xs text-white transition-all outline-none"
                />

                <div className="flex gap-2.5">
                  <input 
                    type="number"
                    placeholder="Amount ($)"
                    value={newFeeAmount}
                    onChange={(e) => setNewFeeAmount(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-zinc-950 border border-zinc-850 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 rounded-xl text-xs text-white transition-all outline-none"
                  />
                  <select 
                    value={newFeeFrequency}
                    onChange={(e) => setNewFeeFrequency(e.target.value)}
                    className="px-2 py-2 bg-zinc-950 border border-zinc-850 rounded-xl text-xs text-zinc-300 outline-none"
                  >
                    <option value="Per Term">Per Term</option>
                    <option value="Annual">Annual</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl text-xxs font-bold transition-all cursor-pointer"
                >
                  Configure New Fee Head
                </button>
              </div>
            </form>
          </div>

          {/* Recent Receipts Ledger */}
          <div className="lg:col-span-2 bg-zinc-900/55 border border-zinc-800/80 p-6 rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2 justify-center sm:justify-start">
                  <FileText className="h-4.5 w-4.5 text-teal-400" /> Recent Receipts Ledger
                </h3>
                <p className="text-zinc-500 text-xs">Search and filter active fee collection receipts.</p>
              </div>
              
              <div className="relative w-full sm:w-64 flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-zinc-500" />
                <input 
                  type="text"
                  placeholder="Search receipt ID or student..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-850 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 rounded-xl text-xs text-white transition-all outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-zinc-800/80 text-zinc-400 text-xxs font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-semibold">Receipt ID</th>
                    <th className="pb-3 px-4 font-semibold">Student</th>
                    <th className="pb-3 px-4 font-semibold">Type</th>
                    <th className="pb-3 px-4 font-semibold">Method</th>
                    <th className="pb-3 pl-4 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/50">
                  {filteredReceipts.map(rec => (
                    <tr key={rec.id} className="text-xs hover:bg-zinc-900/20 transition-all">
                      <td className="py-4 pr-4 font-bold text-zinc-400">{rec.id}</td>
                      <td className="py-4 px-4 font-bold text-white">
                        <div className="space-y-0.5">
                          <div>{rec.studentName}</div>
                          <div className="text-xxs text-zinc-500 font-semibold">Roll #{rec.rollNo}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-zinc-300 font-medium">{rec.feeHead}</td>
                      <td className="py-4 px-4">
                        <span className="text-xxs px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-900 text-zinc-400 font-semibold font-mono">
                          {rec.method}
                        </span>
                      </td>
                      <td className="py-4 pl-4 font-bold text-emerald-400 text-right">${rec.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </main>

      {/* CREATE RECEIPT SIDE DRAWER */}
      {isAddingReceipt && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <form 
            onSubmit={handleRecordReceipt}
            className="w-full max-w-md h-full bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between animate-slide-in shadow-2xl"
          >
            
            {/* Header */}
            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/40 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">Create Fee Receipt</div>
                  <div className="text-xxs text-zinc-400">Issue New Payment Transaction</div>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setIsAddingReceipt(false)}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Input Form Fields */}
            <div className="flex-1 p-5 space-y-5 overflow-y-auto">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Student ID / Roll Number</label>
                <input 
                  type="text"
                  placeholder="e.g. 23"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 rounded-xl text-xs text-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Student Full Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Martin Mutooro"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 rounded-xl text-xs text-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Select Fee Head Type</label>
                <select 
                  value={selectedFeeHead}
                  onChange={(e) => setSelectedFeeHead(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-300 outline-none"
                >
                  {feeHeads.map(head => (
                    <option key={head.id} value={head.name}>{head.name} (${head.amount})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Amount Paid ($)</label>
                <input 
                  type="number"
                  placeholder="150.00"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 rounded-xl text-xs text-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400">Payment Mode</label>
                <select 
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-300 outline-none"
                >
                  <option value="Online">Online</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex gap-3">
              <button
                type="button"
                onClick={() => setIsAddingReceipt(false)}
                className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={recording}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {recording ? (
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                <span>{recording ? "Recording..." : "Record Payment"}</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
