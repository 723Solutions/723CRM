exports.handler = async (event, context) => {
    // Enable CORS for frontend requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body || '{}');
        const name = data.name || 'N/A';
        const email = data.email || 'N/A';
        const bottleneck = data.bottleneck || 'N/A';
        const date = data.date || 'None Selected';
        const time = data.time || 'None Selected';

        // 1. Manually exchange the Refresh Token for a fresh Access Token using standard HTTP
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
                grant_type: 'refresh_token'
            })
        });

        if (!tokenResponse.ok) {
            const err = await tokenResponse.text();
            throw new Error(`Auth Error: ${err}`);
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // 2. Format the Event DateTime
        let startDateTime = '';
        let endDateTime = '';

        if (date !== 'None Selected' && time !== 'None Selected') {
            const timeMap = {
                "07:00 AM": "07:00:00",
                "07:30 AM": "07:30:00",
                "08:00 AM": "08:00:00",
                "08:30 AM": "08:30:00",
                "09:00 AM": "09:00:00",
                "09:30 AM": "09:30:00",
                "10:00 AM": "10:00:00"
            };
            const timeStr = timeMap[time] || "00:00:00";
            startDateTime = `${date}T${timeStr}`;

            const [hours, minutes] = [parseInt(timeStr.slice(0, 2)), parseInt(timeStr.slice(3, 5))];
            let endH = hours;
            let endM = minutes + 30;
            if (endM >= 60) {
                endH += 1;
                endM -= 60;
            }
            const pad = (n) => n.toString().padStart(2, '0');
            endDateTime = `${date}T${pad(endH)}:${pad(endM)}:00`;
        } else {
            startDateTime = `${new Date().toISOString().split('T')[0]}T12:00:00`;
            endDateTime = `${new Date().toISOString().split('T')[0]}T12:30:00`;
        }

        // 3. Create the Google Meet Event natively
        const eventPayload = {
            summary: `723 Solutions Diagnostic - ${name}`,
            description: `Architectural Review with ${name}\nEmail: ${email}\nBottleneck: ${bottleneck}`,
            start: { dateTime: startDateTime, timeZone: 'America/Los_Angeles' },
            end: { dateTime: endDateTime, timeZone: 'America/Los_Angeles' },
            conferenceData: {
                createRequest: {
                    requestId: `723solutions_${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' }
                }
            },
            attendees: [
                {
                    email: email,
                    displayName: name
                }
            ],
            reminders: { useDefault: true }
        };

        const calendarResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventPayload)
        });

        if (!calendarResponse.ok) {
            const err = await calendarResponse.text();
            throw new Error(`Calendar Error: ${err}`);
        }

        const eventData = await calendarResponse.json();

        return {
            statusCode: 200,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'success', meet_link: eventData.htmlLink })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'error', message: error.message })
        };
    }
};
