import datetime
verbose = False

def mesg(message, level, code = 0):
    string = '%s %s [%s]: %s' % (datetime.datetime.now(), level, str(code), message)
    if(code == 0): string = '%s %s: %s' % (datetime.datetime.now(), level, message)
    print(string)

def info(message, code = 0):
    if(verbose):
        mesg(message, 'info', code)

def warn(message, code = 0):
    mesg(message, 'warn', code)

def err(message, fatal = False, code = 0):
    mesg(message, 'error', code)
    if(fatal): quit()