import collections
import re
import sys

remove = re.compile(r"(\w*Download\(.*$)|(Zoom Logo.*$)|(My Recording.*$)|(.*by AISense.*$)|(\w*((\d+:)+\d+\w*))$", re.MULTILINE)
blanks = re.compile(r"\n\n+|(\r\n)(\r\n)+", re.MULTILINE)
filename = sys.argv[1]

with open(filename) as file, open(filename[:-4]+'-cleaned.txt', 'w') as outFile:
    contents = file.read().decode('utf-8')
    file.seek(0)
    countedLines = collections.Counter(l.strip() for l in file if "yeah" not in l.lower())
    speakers = [speaker for speaker, count in countedLines.most_common() if count > 5]
    speakers = "(("+")|(".join(speakers)+"))"
    speakerRE = re.compile(speakers, re.MULTILINE)
    contents = remove.sub("\n", contents)
    contents = blanks.sub("\n", contents)
    contents = speakerRE.sub(r"\n\1", contents)
    outFile.write(contents)
