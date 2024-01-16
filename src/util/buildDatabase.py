import requests, os, sys, shutil
from bs4 import BeautifulSoup
from pymongo import MongoClient
from urllib.parse import quote_plus
from pymongo.errors import ConnectionFailure
import log

#constants
srcdir = os.path.join(os.getcwd(), '../res/')
graindir = os.path.join(srcdir, 'grains/')
hopsdir = os.path.join(srcdir, 'hops/')
yeastsdir = os.path.join(srcdir, 'yeasts/')

#configuration
verbose = False

def pullHops(i: int):
    srcfile = hopsdir + 'hops_' + str(i) + '.html'
    srcurl = 'https://beermaverick.com/api/js/?hop=' + str(i)
    print(srcurl + ' -> ' + srcfile + '... ', end='')
    r = requests.get(srcurl)
    if(r.text != 'invalid request'):
        with open(srcfile, 'w') as file:
            file.write(r.text)
            print('done')
    else:
        print('skipped')

def pullGrains(i: int):
    srcfile = graindir + 'grain_' + str(i) + '.htm'
    srcurl = 'http://beersmith.com/Grains/Grains/grain_' + str(i) + '.htm'
    print(srcurl + ' -> ' + srcfile + '... ', end='')
    r = requests.get(srcurl)
    if(r.text != 'invalid request'):
        with open(srcfile, 'w') as file:
            file.write(r.text)
            print('done')
    else:
        print('skipped')

def pullYeasts():
    srcfile = yeastsdir + 'yeast.html'
    srcurl = 'https://www.brewunited.com/yeast_database.php'
    print(srcurl + ' -> ' + srcfile + '... ', end='')
    r = requests.get(srcurl)
    with open(srcfile, 'w') as file:
        file.write(r.text)
        print('done')

def parseHops(client: MongoClient) -> int:
    docName = 'hop'
    client['brewmate'].drop_collection(docName)
    mongoDoc = client['brewmate'][docName]
    for filename in os.listdir(hopsdir):
        with open(hopsdir + filename) as file:
            s = BeautifulSoup(file.read(), 'lxml')
            acids = s.find('div', {'class': 'section second'}).contents[0].contents[1]
            sprofile = s.find('div', {'class': 'section third'}).contents[0].contents[1].contents[1]
            profile = sprofile.contents[0].contents[0].string + sprofile.contents[1].string
            spurpose = s.find('div', {'class': 'section first'}).contents[0].contents[1].contents[3]
            purpose = spurpose.contents[0].string + spurpose.contents[1].string
            data = {
                "name": s.find('a', {'target': '_blank'}).contents[0].string,
                "description": s.find('p', {'class': 'characteristics'}).contents[0].string,
                "alpha": acids.contents[1].contents[1].string,
                "beta": acids.contents[3].contents[1].string,
                "profile": profile,
                "purpose": purpose
            }
            mongoDoc.insert_one(data)
    return len(list(mongoDoc.find()))

def parseGrains(client: MongoClient) -> int:
    docName = 'grain'
    client['brewmate'].drop_collection(docName)
    mongoDoc = client['brewmate'][docName]
    for filename in os.listdir(graindir):
        with open(graindir + filename) as file:
            s = BeautifulSoup(file.read(), 'lxml')
            table = s.find('tbody').contents[1].contents[1].contents[2].contents[1].contents
            footer = s.contents[0].contents[2].contents[0].contents[0].contents[0].contents[1].contents[1].contents
            try:
                uses = footer[10].string
            except:
                uses = ''
            data = {
                "name": s.find('h2').contents[0].string,
                "colorSRM": table[1].contents[3].contents[1].string.split()[0],
                "type": table[5].contents[1].contents[1].string.lstrip(),
                "potential": table[7].contents[1].contents[1].string.split()[0],
                "notes": footer[8].string,
                "uses": uses
            }
            mongoDoc.insert_one(data)
    return len(list(mongoDoc.find()))

def parseYeast(client: MongoClient) -> int:
    mongoDoc = client['brewmate']['yeast']
    client['brewmate'].drop_collection('yeast')
    with open(yeastsdir + 'yeast.html') as file:
        s = BeautifulSoup(file.read(), 'lxml')
        doc = s.find('table', {'width': '100%'})
        for i in range(2,len(doc.contents)):
            if(doc.contents[i].contents[0].string == 'Name'):
                continue
            try:
                note = doc.contents[i].contents[7].contents[0].string
            except:
                note = ''
            try:
                bestfor = doc.contents[i].contents[7].contents[4].string
            except:
                bestfor = ''
            data = {
                "name": doc.contents[i].contents[0].string,
                "yType": doc.contents[i].contents[2].string,
                "templo": doc.contents[i].contents[4].string.split()[0],
                "temphi": doc.contents[i].contents[4].string.split()[2],
                "attenuation": doc.contents[i].contents[5].string,
                "flocculation": doc.contents[i].contents[6].string,
                "note": note,
                "bestfor": bestfor
            }
            mongoDoc.insert_one(data)
    return len(list(mongoDoc.find()))

def connectToDB() -> MongoClient:
    host = "192.168.1.10:27017"
    dbName = "brewmate"
    client = MongoClient(f"mongodb://{host}/{dbName}")
    userName = "brewmate"
    passwd = "password"
    if any(user['user'] == 'userName' for user in client.brewmate.command('usersInfo')['users']) is None:
        client.brewmate.command('createUser', userName, pwd=passwd, roles=[{'role': 'readWrite', 'db': dbName}])
    if '/' in userName:
        log.err('bad DB_USER', True)
    if '/' in passwd:
        log.err('bad DB_PASSWD', True)
    if '/' in dbName:
        log.err('bad DB_NAME', True)
    client.close()
    uri = "mongodb://%s:%s@%s/%s" % (quote_plus(userName), quote_plus(passwd), host, quote_plus(dbName))
    return MongoClient(uri)

def main():
    minHop = 1
    maxHop = 324
    minGrain = 0
    maxGrain = 89
    args = str(sys.argv)
    log.verbose = '-v' in args
# connect to remote database
    client = connectToDB()
    if '-p' in args or '-P' in args and '--nopull' not in args:
        try:
            os.makedirs(hopsdir, 0o755)
        except:
            for filename in os.listdir(hopsdir):
                filepath = os.path.join(hopsdir, filename)
                try:
                    if os.path.isfile(filepath) or os.path.islink(filepath):
                        os.unlink(filepath)
                    elif os.path.isdir(filepath):
                        shutil.rmtree(filepath)
                except Exception as e:
                    print('Failed to remove %s: %s' % (filepath, e))
        for i in range(minHop, maxHop):
            pullHops(i)
    if '-P' in args:
        print('building hop database... ', end='', flush=True)
        print(str(parseHops(client)), 'documents written')
    if '-g' in args or '-G' in args and '--nopull' not in args:
        try:
            os.makedirs(graindir, 0o755)
        except:
            for filename in os.listdir(graindir):
                filepath = os.path.join(graindir, filename)
                try:
                    if os.path.isfile(filepath) or os.path.islink(filepath):
                        os.unlink(filepath)
                    elif os.path.isdir(filepath):
                        shutil.rmtree(filepath)
                except Exception as e:
                    print('Failed to remove %s: %s' % (filepath, e))
        for i in range(minGrain, maxGrain):
            pullGrains(i)
    if '-G' in args:
        print('building grain database... ', end='', flush=True)
        print(str(parseGrains(client)), 'documents written')
    if '-y' in args or '-Y' in args and '--nopull' not in args:
        try:
            os.makedirs(yeastsdir, 0o755)
        except:
            for filename in os.listdir(yeastsdir):
                filepath = os.path.join(yeastsdir, filename)
                try:
                    if os.path.isfile(filepath) or os.path.islink(filepath):
                        os.unlink(filepath)
                    elif os.path.isdir(filepath):
                        shutil.rmtree(filepath)
                except Exception as e:
                    print('Failed to remove %s: %s' % (filepath, e))
        pullYeasts()
    if '-Y' in args:
        print('building yeast database... ', end='', flush=True)
        print(str(parseYeast(client)), 'documents written')

if __name__ == '__main__':
    main()