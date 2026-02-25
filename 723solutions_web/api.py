from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import subprocess
import os

class SimpleAPI(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path == '/submit-booking':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                
                name = data.get('name', 'N/A')
                email = data.get('email', 'N/A')
                bottleneck = data.get('bottleneck', 'N/A')
                date = data.get('date', 'None Selected')
                time = data.get('time', 'None Selected')
                
                # Format Email Subject and Body
                subject = f"NEW LEAD: 723 Solutions - {name}"
                body = f"""New Architectural Review Requested:

Name: {name}
Email: {email}
Bottleneck: {bottleneck}

Requested Meeting:
Date: {date}
Time: {time} (PST)

Please reach out to confirm this booking or sync it with the master calendar."""

                # Call the new Google Calendar API integration
                script_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'execution', 'google_calendar.py')
                print(f"Calling script: {script_path}")
                
                # We need to compute the dt_start_str and dt_end_str for the python script
                dt_start_str = ""
                dt_end_str = ""
                if date != 'None Selected' and time != 'None Selected':
                    try:
                        from datetime import datetime, timedelta
                        time_stripped = time.replace(' AM', 'AM').replace(' PM', 'PM')
                        dt = datetime.strptime(f"{date} {time_stripped}", "%Y-%m-%d %I:%M%p")
                        
                        # Calendar API wants 'YYYY-MM-DDTHH:MM:SS'
                        dt_start_str = dt.strftime("%Y-%m-%dT%H:%M:%S")
                        dt_end_str = (dt + timedelta(minutes=30)).strftime("%Y-%m-%dT%H:%M:%S")
                    except Exception as e:
                        print(f"Failed to parse time for Calendar API: {e}")

                summary = f"723 Solutions Diagnostic - {name}"
                description = f"Architectural Review with {name}\nEmail: {email}\nBottleneck: {bottleneck}"

                # Run the script via subprocess, passing the arguments required by the google_calendar.py __main__ block (which we need to add)
                process = subprocess.Popen(
                    ['/Users/larissagedlaman/Desktop/AntiGravity/.venv/bin/python', script_path, summary, description, dt_start_str, dt_end_str, email],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE
                )
                stdout, stderr = process.communicate()
                print(f"Process return code: {process.returncode}")
                if stdout: print(f"Stdout: {stdout.decode('utf-8') if isinstance(stdout, bytes) else str(stdout)}")
                if stderr: print(f"Stderr: {stderr.decode('utf-8') if isinstance(stderr, bytes) else str(stderr)}")
                
                if process.returncode == 0 and ('Successfully created' in (stdout.decode('utf-8') if isinstance(stdout, bytes) else str(stdout)) if stdout else True):
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'status': 'success'}).encode('utf-8'))
                else:
                    self.send_response(500)
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    # Decode stdout and catch errors if decoding fails (it may already be str)
                    error_msg = stderr.decode('utf-8') if isinstance(stderr, bytes) else str(stderr)
                    self.wfile.write(json.dumps({'status': 'error', 'message': error_msg}).encode('utf-8'))
                    
            except Exception as e:
                self.send_response(500)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'status': 'error', 'message': str(e)}).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=SimpleAPI, port=8081):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting API Server on port {port}...")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
