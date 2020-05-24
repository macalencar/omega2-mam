import serial
while True:
        try:
                s = serial.Serial('/dev/ttyS1',9600,timeout=18)
                msg=""
                while True:
                        c = s.read()
                        if '\n' == c: break;
                        else: msg+=c
                s.close()
                print(msg)
        except:
                print("Broken Package")
