import requests, os, sys
from bs4 import BeautifulSoup

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

def parseHops() -> str:
    i = 0
    name = []
    description = []
    alpha = []
    beta = []
    profile = []
    purpose = []
    for filename in os.listdir(hopsdir):
        with open(hopsdir + filename) as file:
            try:
                s = BeautifulSoup(file.read(), 'lxml')
                sname = s.find('a', {'target': '_blank'})
                name.append(sname.contents[0].string)
                sdescription = s.find('p', {'class': 'characteristics'}).contents[0]
                description.append(sdescription.string)
                #print(description[i])
                ss = s.find('div', {'class': 'section third'}).contents[0].contents[1].contents[1].contents[0].contents[0]
                acids = s.find('div', {'class': 'section second'}).contents[0].contents[1]
                alpha.append(acids.contents[1])
                #print(alpha[i])
                beta.append(acids.contents[3])
                #print(beta[i])
                spurpose = s.find('div', {'class': 'section first'}).contents[0].contents[1].contents[3]
                p0 = spurpose.contents[0].string
                p1 = spurpose.contents[1].string
                purpose.append(p0 + p1)
                #print(purpose[i])
                sprofile = s.find('div', {'class': 'section third'}).contents[0].contents[1].contents[1]
                p0 = sprofile.contents[0].contents[0].string
                p1 = sprofile.contents[1].string
                profile.append(p0 + p1)
                #print(profile[i])
            except:
                return filename
        i = i + 1
    return ''

def parseGrains() -> str:
    i = 0
    name = []
    gType = []
    potential = []
    colorSRM = []
    notes = []
    uses = []
    for filename in os.listdir(graindir):
        with open(graindir + filename) as file:
            try:
                s = BeautifulSoup(file.read(), 'lxml')
                name.append(s.find('h2').contents[0].string)
                table = s.find('tbody').contents[1].contents[1].contents[2].contents[1].contents
                colorSRM.append(float(table[1].contents[3].contents[1].string.split()[0]))
                #print(colorSRM[i])
                gType.append(table[5].contents[1].contents[1].string)
                #print(gType[i])
                potential.append(float(table[7].contents[1].contents[1].string.split()[0]))
                #print(potential[i])
                footer = s.contents[0].contents[2].contents[0].contents[0].contents[0].contents[1].contents[1].contents
                notes.append(footer[8].string)
                #print(notes[i])
                try:
                    uses.append(footer[10].string)
                except:
                    uses.append('')
                #print(uses[i])
            except:
                return filename
        i = i + 1
    return ''

def parseYeast():
    i = 0
    name = []
    yType = []
    templo = []
    temphi = []
    attenuation = []
    flocculation = []
    notes = []
    bestfor = []
    with open(yeastsdir + 'yeast.html') as file:
        s = BeautifulSoup(file.read(), 'lxml')
        doc = s.find('table', {'width': '100%'})
        for i in range(2,len(doc.contents)):
            if(doc.contents[i].contents[0].string == 'Name'):
                continue
            name.append(doc.contents[i].contents[0].string)
            yType.append(doc.contents[i].contents[2].string)
            templo.append(doc.contents[i].contents[4].string.split()[0])
            temphi.append(doc.contents[i].contents[4].string.split()[2])
            attenuation.append(doc.contents[i].contents[5].string)
            flocculation.append(doc.contents[i].contents[6].string)
            try:
                notes.append(doc.contents[i].contents[7].contents[0].string)
            except:
                notes.append('')
            try:
                bestfor.append(doc.contents[i].contents[7].contents[4].string)
            except:
                bestfor.append('')
            
def main():
    minHop = 1
    maxHop = 324
    minGrain = 0
    maxGrain = 89
    args = str(sys.argv)
    verbose = '-v' in args
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
        print('building in-memory database... ', end='')
        err = parseHops()
        if err == '': print('done')
        else: print('failed while parsing file', err)
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
        print('building in-memory database... ', end='')
        err = parseGrains()
        if err == '' : print('done')
        else: print('failed while parsing file', err)
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
        print('building in-memory database... ', end='')
        parseYeast()
        print('done')


if __name__ == '__main__':
    main()