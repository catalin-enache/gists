"""
https://gist.github.com/fuentesjr/240063/d658d321d9f6adb520078a0cd8f20fa99d6be9b2
Simple preforking echo server in Python.
Python port of http://tomayko.com/writings/unicorn-is-unix.
"""

import os, sys, socket

host, port = 'localhost', 4246

# Create a socket, bind it to localhost:4242, and start
# listening. Runs once in the parent; all forked children
# inherit the socket's file descriptor.
acceptor = socket.socket()
acceptor.bind((host, port))
acceptor.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
acceptor.listen(10)

# Ryan's Ruby code here traps EXIT and closes the socket. This
# isn't required in Python; the socket will be closed when the
# socket object gets garbage collected.

# Fork you some child processes. In the parent, the call to
# fork returns immediately with the pid of the child process;
# fork never returns in the child because we exit at the end
# of the block.
for i in range(3):
    pid = os.fork()

    if pid == 0:
        # now we're in the child process; trap (Ctrl-C)
        # interrupts by catching KeyboardInterrupt) and exit
        # immediately instead of dumping stack to stderr.
        childpid = os.getpid()
        print("Child %s listening on localhost:%s" % (childpid, port))
        try:
            while 1:
                # This is where the magic happens. accept(2)
                # blocks until a new connection is ready to be
                # dequeued.
                conn, addr = acceptor.accept()
                conn.sendall(bytes('Child %s echo' % childpid, "utf-8"))
                data = conn.recv(1024)
                print('Child %s received:' % childpid, data.decode("utf-8"))
                conn.close()
        except KeyboardInterrupt:
            sys.exit()

# Sit back and wait for all child processes to exit.
#
# Trap interrupts, write a note, and exit immediately in
# parent. This trap is not inherited by the forks because it
# runs after forking has commenced.
try:
    os.waitpid(-1, 0)
except KeyboardInterrupt:
    print("\nbailing")
    sys.exit()
