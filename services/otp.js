import crypto from "crypto";

/**
 * OTP System Service
 * Manages OTP generation, validation, rate limiting, and brute force prevention.
 */

// Initialize a global OTP registry map if it does not exist
global.otpStore = global.otpStore || new Map();

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown between resends
const MAX_RESENDS_PER_WINDOW = 3;     // Max 3 OTP requests in the window
const RESEND_WINDOW_MS = 10 * 60 * 1000; // 10 minutes sliding window
const MAX_VERIFICATION_ATTEMPTS = 5;  // Lockout after 5 incorrect attempts

/**
 * Generates a cryptographically secure 6-digit OTP and stores it with rate-limiting rules.
 * 
 * @param {string} email - Recipient email address
 * @returns {string} The generated 6-digit OTP
 */
export function generateOTP(email) {
  if (!email || typeof email !== "string" || !email.includes("@")) {
    throw new Error("A valid email address is required.");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const now = Date.now();
  let record = global.otpStore.get(normalizedEmail);

  if (record) {
    // 1. Enforce 60-second cooldown between resends
    const timeSinceLastSent = now - record.lastSentAt;
    if (timeSinceLastSent < RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((RESEND_COOLDOWN_MS - timeSinceLastSent) / 1000);
      throw new Error(`Please wait ${waitSeconds} second(s) before requesting a new OTP.`);
    }

    // 2. Enforce sliding window rate limit (Max 3 OTP requests per 10 minutes)
    const validTimestamps = record.requestTimestamps.filter(
      (ts) => now - ts < RESEND_WINDOW_MS
    );

    if (validTimestamps.length >= MAX_RESENDS_PER_WINDOW) {
      const oldestTs = validTimestamps[0];
      const minutesRemaining = Math.ceil(
        (RESEND_WINDOW_MS - (now - oldestTs)) / (60 * 1000)
      );
      throw new Error(
        `Too many OTP requests. Please try again in ${minutesRemaining} minute(s).`
      );
    }

    record.requestTimestamps = validTimestamps;
  } else {
    // Initialize record for new email
    record = {
      otp: "",
      expiresAt: 0,
      attempts: 0,
      lastSentAt: 0,
      requestTimestamps: []
    };
  }

  // Generate secure 6-digit OTP
  const otp = crypto.randomInt(100000, 1000000).toString();

  // Update record details
  record.otp = otp;
  record.expiresAt = now + OTP_EXPIRY_MS;
  record.attempts = 0; // Reset verification attempts for the new OTP
  record.lastSentAt = now;
  record.requestTimestamps.push(now);

  global.otpStore.set(normalizedEmail, record);

  console.log(`[OTP Service] Generated OTP for ${normalizedEmail} (Expires in 10 minutes)`);
  return otp;
}

/**
 * Verifies a provided OTP against the stored record, enforcing expiration and brute force lockout.
 * 
 * @param {string} email - Recipient email address
 * @param {string} otpCode - The 6-digit OTP to verify
 * @returns {Object} Object indicating success or error message
 */
export function verifyOTP(email, otpCode) {
  if (!email || !otpCode) {
    return { success: false, error: "Email and OTP code are required." };
  }

  const normalizedEmail = email.toLowerCase().trim();
  const record = global.otpStore.get(normalizedEmail);

  if (!record || !record.otp) {
    return {
      success: false,
      error: "No active OTP request found. Please request a new OTP."
    };
  }

  // 1. Check brute force protection
  if (record.attempts >= MAX_VERIFICATION_ATTEMPTS) {
    global.otpStore.delete(normalizedEmail);
    return {
      success: false,
      error: "Maximum verification attempts exceeded. This OTP has been invalidated. Please request a new one."
    };
  }

  // 2. Check expiration
  if (Date.now() > record.expiresAt) {
    global.otpStore.delete(normalizedEmail);
    return {
      success: false,
      error: "OTP has expired. Please request a new OTP."
    };
  }

  // Increment attempt counter
  record.attempts++;

  // 3. Verify OTP
  if (record.otp === otpCode.trim()) {
    // Verification successful: Delete the OTP to prevent reuse (replay attack prevention)
    global.otpStore.delete(normalizedEmail);
    console.log(`[OTP Service] OTP verified successfully for ${normalizedEmail}`);
    return { success: true };
  } else {
    const remainingAttempts = MAX_VERIFICATION_ATTEMPTS - record.attempts;
    
    if (remainingAttempts <= 0) {
      global.otpStore.delete(normalizedEmail);
      return {
        success: false,
        error: "Incorrect OTP. Maximum verification attempts exceeded. This OTP has been invalidated."
      };
    }

    // Save incremented attempts
    global.otpStore.set(normalizedEmail, record);
    console.log(
      `[OTP Service] Failed OTP attempt for ${normalizedEmail}. ${remainingAttempts} attempts remaining.`
    );
    
    return {
      success: false,
      error: `Incorrect OTP. You have ${remainingAttempts} attempt(s) remaining.`
    };
  }
}
