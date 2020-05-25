# Echo client program
import socket

HOST, PORT = 'localhost', 4246

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    data = s.recv(1024)
    print('Client received:', data.decode("utf-8"))
    s.sendall(bytes('py client here py', 'utf-8'))
    s.close()

