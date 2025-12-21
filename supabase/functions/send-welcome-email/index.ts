import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// ACCESS THE VAULT
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    // 1. Capture the data from the Database Trigger
    const { record } = await req.json()

    console.log(`[PROTOCOL INITIATED] Target identified: ${record.email}`)

    // 2. Dispatch the Compliance Blueprint via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'True608 Intelligence <onboarding@resend.dev>', 
        to: [record.email],
        subject: '[ACTION REQUIRED] 40 CFR Part 84 Survival Blueprint',
        html: `
          <div style="font-family: sans-serif; background: #050505; color: #ffffff; padding: 40px; border: 2px solid #dc2626; border-radius: 10px;">
            <h2 style="color: #dc2626; text-transform: uppercase; letter-spacing: 2px;">Protocol Initiated: Secure Delivery</h2>
            <p>This is an automated transmission of the <strong>2026 Federal Compliance Manual</strong> for EPA Part 84 tracking.</p>
            <hr style="border: 0.5px solid #333; margin: 20px 0;" />
            <p><strong>Lead ID:</strong> TRU-${Math.floor(1000 + Math.random() * 9000)}</p>
            <p><strong>Status:</strong> Manual Tracking Active</p>
            <p><strong>Liability Warning:</strong> Manual data entry errors carry a federal fine risk of $44,539 per day. To activate <strong>The Shield</strong> (Full Automation), visit your dashboard.</p>
            <div style="margin-top: 30px;">
              <a href="https://true608.com/blueprint.pdf" style="background: #dc2626; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">ACCESS PDF BLUEPRINT</a>
            </div>
            <p style="font-size: 10px; color: #666; margin-top: 40px; font-family: monospace;">This is an encrypted transmission from True608 Intelligence HQ.</p>
          </div>
        `,
      }),
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
})