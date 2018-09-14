import sys
import re

remove = re.compile(r"(^(WEBVTT.)$)|(^(\d+)(?:\n|\r\n?)+(^.*-->.*$))", re.MULTILINE)
blanks = re.compile(r"\n\n+|(\r\n)(\r\n)+", re.MULTILINE)
filename = sys.argv[1]

with open(filename) as file, open(filename[:-4]+'-cleaned.txt', 'w') as outFile:
    print 'Checking '+filename
    str = file.read().decode('utf-8')
    str = remove.sub("", str)
    str = blanks.sub("", str)
    outFile.write(str)
