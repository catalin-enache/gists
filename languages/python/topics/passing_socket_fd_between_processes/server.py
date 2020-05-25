import socket, struct, os, time


unix_socket_address = '/tmp/unix_socket_test'
port = 2345
host = '127.0.0.1'


def send_fd(sock, fd):
    """
    Send a single file descriptor.
    """
    sock.sendmsg([b'x'], [(socket.SOL_SOCKET, socket.SCM_RIGHTS, struct.pack('i', fd))])
    ack = sock.recv(2)
    assert ack == b'OK'
    print('worker received client fd')


def server():
    try:
        os.unlink(unix_socket_address)
    except OSError:
        if os.path.exists(unix_socket_address):
            raise
    # Wait for the worker to connect
    work_serv = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    work_serv.bind(unix_socket_address)
    work_serv.listen(1)
    worker, addr = work_serv.accept()
    print('worker available')
    # Now run a TCP/IP server and send clients to worker
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, True)
    s.bind((host, port))
    s.listen(1)
    while True:
        client, addr = s.accept()
        print('SERVER: Got client from', addr)
        print('sending client fd to worker')
        send_fd(worker, client.fileno())
        while True:
            msg = client.recv(2)
            if not msg:
                break
            print('message from client', msg, 'echoing back')
            client.send(msg)
            time.sleep(1)
            # client.close()

if __name__ == '__main__':
    server()

