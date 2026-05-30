/**
 * Email Service Layer
 * Sends transactional emails using the Brevo API and highly responsive premium HTML templates.
 */

/**
 * Common private helper to dispatch an email via the Brevo API.
 * 
 * @param {Object} params
 * @param {string} params.to - Recipient email address
 * @param {string} params.subject - Email subject line
 * @param {string} params.htmlContent - High fidelity HTML body content
 */
async function sendBrevoEmail({ to, subject, htmlContent }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "support.noormedico@gmail.com";

  if (!apiKey) {
    console.error("[Email Service] Missing Brevo Configuration: BREVO_API_KEY env variable is not set!");
    throw new Error("Mailing configuration error. Please contact the administrator.");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: "Noor Medico" },
      to: [{ email: to, name: to.split("@")[0] }],
      subject: subject,
      htmlContent: htmlContent,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("[Email Service] Brevo API error response:", errorData);
    throw new Error(errorData.message || "Failed to deliver message via Brevo.");
  }

  return await response.json();
}

/**
 * Sends a secure 6-digit OTP verification email.
 */
export async function sendOTP({ email, otp, name }) {
  const displayName = name ? name.trim() : "Valued Customer";
  const subject = `Verify Your Identity - Noor Medico [${otp}]`;
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 0; background-color: #f8fafc; color: #1e293b; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
      <div style="background-color: #0f766e; padding: 40px 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">NOOR MEDICO</h1>
        <p style="margin: 8px 0 0 0; color: #ccfbf1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Registered Chemist & Druggist</p>
      </div>
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 16px; font-size: 20px; font-weight: 700;">Verify Your Identity</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">Hello ${displayName},</p>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 30px;">Thank you for choosing Noor Medico. Use the following One-Time Password (OTP) to complete your verification. This OTP is valid for <strong>10 minutes</strong>.</p>
        
        <div style="background-color: #f0fdfa; border: 1px dashed #0d9488; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 30px;">
          <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 8px; color: #0f766e; display: inline-block; padding-left: 8px;">${otp}</span>
        </div>
        
        <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin-bottom: 30px;">
          <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #b45309; font-weight: 700;">Security Notice:</p>
          <p style="margin: 4px 0 0 0; font-size: 13px; line-height: 1.5; color: #78350f;">If you did not request this verification code, please ignore this email or contact support immediately. Do not share this OTP with anyone.</p>
        </div>
        
        <p style="font-size: 14px; color: #64748b; margin-bottom: 0; line-height: 1.5;">Warm regards,<br><strong style="color: #0f766e;">The Noor Medico Team</strong></p>
      </div>
      <div style="background-color: #f1f5f9; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #94a3b8;">Shop No. 1, Noor Heights, Sector 15, Koperkhairane, Navi Mumbai, MH 400709</p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">Need help? Call us at <a href="tel:+918828081398" style="color: #0f766e; text-decoration: none; font-weight: 600;">+91 88280 81398</a></p>
      </div>
    </div>
  `;

  return sendBrevoEmail({ to: email, subject, htmlContent });
}

/**
 * Sends a password reset email containing a secure link.
 */
export async function sendPasswordReset({ email, resetLink, name }) {
  const displayName = name ? name.trim() : "Valued Customer";
  const subject = "Reset Your Password - Noor Medico";
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 0; background-color: #f8fafc; color: #1e293b; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
      <div style="background-color: #0f766e; padding: 40px 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">NOOR MEDICO</h1>
        <p style="margin: 8px 0 0 0; color: #ccfbf1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Registered Chemist & Druggist</p>
      </div>
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 16px; font-size: 20px; font-weight: 700;">Reset Your Password</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">Hello ${displayName},</p>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 30px;">We received a request to reset the password associated with your account. Click the button below to choose a new password. This link is valid for <strong>1 hour</strong>.</p>
        
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="${resetLink}" style="background-color: #0f766e; color: #ffffff; padding: 14px 32px; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(15, 118, 110, 0.2);">Reset Password</a>
        </div>
        
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
          <p style="margin: 0; font-size: 12px; color: #64748b; word-break: break-all; line-height: 1.5;">If the button above doesn't work, copy and paste this URL into your browser:<br><a href="${resetLink}" style="color: #0f766e; text-decoration: none;">${resetLink}</a></p>
        </div>
        
        <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin-bottom: 30px;">
          <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #b45309; font-weight: 700;">Didn't request this?</p>
          <p style="margin: 4px 0 0 0; font-size: 13px; line-height: 1.5; color: #78350f;">If you did not request a password reset, no action is needed. Your password will remain secure.</p>
        </div>
        
        <p style="font-size: 14px; color: #64748b; margin-bottom: 0; line-height: 1.5;">Warm regards,<br><strong style="color: #0f766e;">The Noor Medico Team</strong></p>
      </div>
      <div style="background-color: #f1f5f9; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #94a3b8;">Shop No. 1, Noor Heights, Sector 15, Koperkhairane, Navi Mumbai, MH 400709</p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">Need help? Call us at <a href="tel:+918828081398" style="color: #0f766e; text-decoration: none; font-weight: 600;">+91 88280 81398</a></p>
      </div>
    </div>
  `;

  return sendBrevoEmail({ to: email, subject, htmlContent });
}

/**
 * Sends a welcome onboarding email to a newly registered user.
 */
export async function sendWelcomeEmail({ email, name }) {
  const displayName = name ? name.trim() : "Valued Customer";
  const subject = "Welcome to Noor Medico!";
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 0; background-color: #f8fafc; color: #1e293b; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
      <div style="background-color: #0f766e; padding: 40px 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">NOOR MEDICO</h1>
        <p style="margin: 8px 0 0 0; color: #ccfbf1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Registered Chemist & Druggist</p>
      </div>
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 16px; font-size: 22px; font-weight: 800; text-align: center;">Welcome to Noor Medico!</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 20px;">Hello ${displayName},</p>
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 24px;">Thank you for registering with Noor Medico. We are thrilled to have you join our healthcare community. We are dedicated to providing you with 100% genuine medicines and professional pharmacist care.</p>
        
        <div style="background-color: #f0fdfa; border-radius: 16px; padding: 24px; margin-bottom: 30px; border: 1px solid #ccfbf1;">
          <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 16px; font-weight: 700; color: #0f766e;">Services we offer:</h3>
          <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 14px; line-height: 1.6;">
            <li style="margin-bottom: 8px;"><strong>Submit Prescription Inquiries:</strong> Send us your prescription through our contact portal for fast checkout.</li>
            <li style="margin-bottom: 8px;"><strong>WhatsApp Order Pre-check:</strong> Share a photo of your prescription directly to coordinate preparation.</li>
            <li style="margin-bottom: 0;"><strong>Consult our Pharmacist:</strong> Get advice on correct dosages, side effects, and storage guidelines.</li>
          </ul>
        </div>
        
        <p style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 30px;">If you have any questions or need assistance, do not hesitate to contact our helpline. We are here to support your wellness journey.</p>
        
        <p style="font-size: 14px; color: #64748b; margin-bottom: 0; line-height: 1.5;">Warm regards,<br><strong style="color: #0f766e;">The Noor Medico Team</strong></p>
      </div>
      <div style="background-color: #f1f5f9; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #94a3b8;">Shop No. 1, Noor Heights, Sector 15, Koperkhairane, Navi Mumbai, MH 400709</p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">Need help? Call us at <a href="tel:+918828081398" style="color: #0f766e; text-decoration: none; font-weight: 600;">+91 88280 81398</a></p>
      </div>
    </div>
  `;

  return sendBrevoEmail({ to: email, subject, htmlContent });
}

/**
 * Sends a generic notification email.
 */
export async function sendNotification({ email, subject, title, body }) {
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 0; background-color: #f8fafc; color: #1e293b; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
      <div style="background-color: #0f766e; padding: 40px 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">NOOR MEDICO</h1>
        <p style="margin: 8px 0 0 0; color: #ccfbf1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">Registered Chemist & Druggist</p>
      </div>
      <div style="padding: 40px 30px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 16px; font-size: 20px; font-weight: 700;">${title}</h2>
        <div style="font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 30px; white-space: pre-wrap;">${body}</div>
        
        <p style="font-size: 14px; color: #64748b; margin-bottom: 0; line-height: 1.5;">Warm regards,<br><strong style="color: #0f766e;">The Noor Medico Team</strong></p>
      </div>
      <div style="background-color: #f1f5f9; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #94a3b8;">Shop No. 1, Noor Heights, Sector 15, Koperkhairane, Navi Mumbai, MH 400709</p>
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">Need help? Call us at <a href="tel:+918828081398" style="color: #0f766e; text-decoration: none; font-weight: 600;">+91 88280 81398</a></p>
      </div>
    </div>
  `;

  return sendBrevoEmail({ to: email, subject, htmlContent });
}

/**
 * Sends a patient prescription / medicine inquiry submission alert (the default website feature).
 */
export async function sendInquiryEmail({ name, phone, email, message }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "support.noormedico@gmail.com";
  const receiverEmail = process.env.BREVO_RECEIVER_EMAIL || "zrazmi3@gmail.com";

  if (!apiKey) {
    console.error("[Email Service] Missing Brevo Configuration env variables!");
    throw new Error("Mailing configuration error. Please contact the administrator.");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: "Noor Medico Website Portal" },
      to: [{ email: receiverEmail, name: "Noor Medico Admin" }],
      subject: `New Medicine Inquiry from ${name}`,
      htmlContent: `
        <div style="font-family: sans-serif; padding: 24px; color: #1e293b; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; border-bottom: 2px solid #0f766e; padding-bottom: 16px; margin-bottom: 20px;">
            <h1 style="color: #0f766e; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">NOOR MEDICO</h1>
            <p style="margin: 4px 0 0 0; color: #059669; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Registered Chemist & Druggist Portal</p>
          </div>
          
          <p style="margin-top: 0; font-size: 15px; line-height: 1.5; color: #475569;">You have received a new online prescription or medicine inquiry from the website contact channel:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #64748b; font-size: 13px; text-transform: uppercase; width: 120px;">Customer Name</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #64748b; font-size: 13px; text-transform: uppercase;">Phone Number</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;"><a href="tel:${phone}" style="color: #0f766e; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #64748b; font-size: 13px; text-transform: uppercase;">Email Address</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;"><a href="mailto:${email}" style="color: #0f766e; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #0f766e; margin-top: 10px;">
            <p style="margin: 0 0 8px 0; font-weight: 700; font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Message / Inquiry Details</p>
            <p style="margin: 0; line-height: 1.6; font-size: 14px; color: #334155; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center;">
            <p style="font-size: 11px; color: #94a3b8; margin: 0;">
              This notification was generated by the NOOR MEDICO website portal. Please respond to the customer within 15 minutes.
            </p>
          </div>
        </div>
      `
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Brevo API error response:", errorData);
    throw new Error(errorData.message || "Failed to deliver message via Brevo.");
  }

  return await response.json();
}
