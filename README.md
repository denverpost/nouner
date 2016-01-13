# Nouner
Given a lookup object and a chunk of text, link any matching proper nouns within the text

## Usage
Look at www/include.html for the js in use on production.

Look at www/example.html for a bare-bones implementation.

## Updating the lookups
The current workflow has plenty of room for improvement:

First, download the Google Sheet as a CSV. Then:
```
cd www
cp ~/Downloads/Sports\ Lookups\ -\ broncos.csv csv/broncos.csv
python csvtojs.py csv/broncos.csv > lookup/broncos.js
```

## Performance Considerations
In addition to the extra JS being downloaded on the page, every time the noun-matcher runs  it:

1. Loops through each paragraph.
2. Pulls out all the proper nouns in each paragraph.
3. Loops through those proper nouns and looks to see if any of those match the proper nouns we have in our list.
4. If there's a match, it replaces that proper noun with a piece of linked text.

# License
Copyright © 2015-2016 The Denver Post

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

