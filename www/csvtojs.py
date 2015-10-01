#!/usr/bin/env python
# Turn a two-column CSV into a javascript object.
import os, sys, csv
import argparse
import doctest
import string

def escape(escapee):
    """ Return a js-safe string.
        >>> print escape('Escape "THIS"')
        Escape \\"THIS\\"
        """
    return string.replace(escapee, '"', '\\"')

def main(args):
    """ Loop through each filename, read the CSV and return a js object.
        >>> args = dict(files=[['csv/test.csv']])
        >>> print args
        >>> main(args)
        >>> #matcher.lookup = {"Peyton Manning": "http://www.denverpost.com/peyton-manning"};
        """
    print args
    for item in args.files[0]:
        c = "matcher.lookup = {"
        f = open('%s' % item, 'rt')
        reader = csv.reader(f)

        for row in reader:
            # Skip the keys
            if reader.line_num == 1:
                continue
            c += '"%s": "%s",' % (escape(row[0]), escape(row[1]))

        # Delete the comma, which will be the last character
        c = c[:-1]

        c += "};"

        # Send to STDOUT
        print c


def build_parser(args):
    """ A method to make arg parsing testable.
        """
    parser = argparse.ArgumentParser(usage='', description='Handle the options.',
                                     epilog='')
    parser.add_argument("-v", "--verbose", dest="verbose", default=False, action="store_true")
    parser.add_argument("files", action="append", nargs="*")
    return parser.parse_args()

if __name__ == '__main__':
    args = build_parser(sys.argv)

    if args.verbose:
        doctest.testmod(verbose=args.verbose)

    main(args)
