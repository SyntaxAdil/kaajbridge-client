// lib/emails/reset-password-template.js

export function resetPasswordTemplate({ userName, url }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td style="background:#18181b;padding:32px 40px;">
              <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;"><span className="font-bold  ms-2">
            Kaaj<span className="text-orange-600">Bridge</span>
          </span></p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">Reset your password</p>
              <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">
                Hi ${userName || "there"}, we received a request to reset your password.
                Click the button below to choose a new one.
              </p>

              <a href="${url}"
                style="display:inline-block;background:#18181b;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:8px;font-size:15px;font-weight:600;">
                Reset password
              </a>

              <div style="margin:28px 0;border-top:1px solid #f3f4f6;"></div>

              <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;">
                This link expires in <strong style="color:#374151;">1 hour</strong>.
                If you did not request this, you can safely ignore this email.
              </p>
              <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;word-break:break-all;">
                Or copy this link: <a href="${url}" style="color:#6b7280;">${url}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #f3f4f6;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} KaajBridge. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
