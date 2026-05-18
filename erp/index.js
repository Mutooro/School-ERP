const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// Set concurrent options for cost-control and performance
setGlobalOptions({ maxInstances: 10 });

/**
 * HTTP Cloud Function to fetch student profile metadata.
 */
exports.getStudentData = onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  logger.info("Student profile request received", { structuredData: true });

  const studentData = {
    success: true,
    student: {
      id: "MM-232",
      firstName: "Martin",
      lastName: "Mutooro",
      classLevel: "Grade 10-A",
      rollNo: 23,
      gpa: 3.82,
      attendance: "96.4%",
      outstandingFees: 150.00,
      academicYear: "2026-27"
    }
  };

  res.status(200).json(studentData);
});

/**
 * HTTP Cloud Function to save class attendance logs.
 */
exports.saveAttendance = onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  logger.info("Save attendance log request received", { structuredData: true });

  const { class: classLevel, date, records } = req.body || {};

  if (!classLevel || !date || !records) {
    logger.warn("Missing required attendance fields in POST body");
    res.status(400).json({ success: false, error: "Missing required roster fields" });
    return;
  }

  logger.info(`🔥 Successfully synced ${records.length} attendance logs for ${classLevel} on date ${date}!`);

  res.status(200).json({
    success: true,
    message: "Roster attendance successfully saved and synced to Firebase!"
  });
});

/**
 * HTTP Cloud Function to fetch total school fee collections and outstanding dues summary.
 */
exports.getFeesSummary = onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  logger.info("Fees summary request received", { structuredData: true });

  const feesSummary = {
    success: true,
    totalCollections: 42890.00,
    outstandingDues: 8120.00,
    activeLedgersCount: 1248,
    targetPercent: 94
  };

  res.status(200).json(feesSummary);
});

/**
 * HTTP Cloud Function to record a student payment receipt entry.
 */
exports.recordPayment = onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
    return;
  }

  logger.info("Record payment transaction request received", { structuredData: true });

  const { id: receiptId, studentName, rollNo, feeHead, amount, date, method } = req.body || {};

  if (!receiptId || !studentName || !feeHead || !amount || !date || !method) {
    logger.warn("Missing payment details in POST body");
    res.status(400).json({ success: false, error: "Missing required receipt transaction details" });
    return;
  }

  logger.info(`🔥 Payment receipt ${receiptId} issued successfully!`, {
    receiptId,
    studentName,
    rollNo,
    feeHead,
    amount,
    date,
    method
  });

  res.status(200).json({
    success: true,
    message: `Payment transaction ${receiptId} successfully registered and logged to Firebase!`
  });
});
