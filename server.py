import os
import http.server
import socketserver

# Define the port and directory to serve
PORT = 80
DIRECTORY = "G:/Github/startpage"

# Create a custom handler for serving files
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def guess_type(self, path):
        base, ext = os.path.splitext(path)
        if ext in ('.js', '.mjs'):
            return 'application/javascript'
        return super().guess_type(path)

# Set the working directory to where the server.py file is located
os.chdir(DIRECTORY)

# Function to start the server
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
