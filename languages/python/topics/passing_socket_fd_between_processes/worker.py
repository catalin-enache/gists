# worker.py
import socket
import struct

unix_socket_address = '/tmp/unix_socket_test'


def recv_fd(sock):
    """
    Receive a single file descriptor
    """
    msg, ancdata, flags, addr = sock.recvmsg(1, socket.CMSG_LEN(struct.calcsize('i')))
    cmsg_level, cmsg_type, cmsg_data = ancdata[0]
    assert cmsg_level == socket.SOL_SOCKET and cmsg_type == socket.SCM_RIGHTS
    sock.sendall(b'OK')
    fd = struct.unpack('i', cmsg_data)[0]
    print('worker received fd', fd, 'and message', msg)
    return fd


def worker():
    serv = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    serv.connect(unix_socket_address)
    while True:
        fd = recv_fd(serv)
        print('WORKER: GOT FD', fd)
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM, fileno=fd) as client:
            while True:
                msg = client.recv(1024)
                if not msg:
                    break
                print('WORKER: RECV {!r}'.format(msg))
                client.send(msg)
                # client.close()


if __name__ == '__main__':
    worker()


