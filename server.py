import os
import http.server
import socketserver
import threading
import signal
import sys

# Define the port and directory to serve
PORT = 80
DIRECTORY = "."

# Set the working directory to where the server.py file is located
os.chdir(DIRECTORY)

# Create a handler for serving files
Handler = http.server.SimpleHTTPRequestHandler

# Function to start the server
def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at port {PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server...")
            httpd.shutdown()
            sys.exit(0)

# Start the server in a background thread
server_thread = threading.Thread(target=start_server)
server_thread.daemon = True
server_thread.start()

# Function to handle stopping the server via signal interrupt
def signal_handler(sig, frame):
    print("\nReceived interrupt, stopping the server...")
    sys.exit(0)

# Capture keyboard interrupt (Ctrl+C)
signal.signal(signal.SIGINT, signal_handler)

# Keep the script alive
server_thread.join()
