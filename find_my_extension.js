// find_my_extension.js
// Go Namhyeon <gnh1201@gmail.com
// 2020-05-01

function main(args) {
    var filename = args.get(0);
    var keywords = filename.split(".");
    var ext = keywords[keywords.length - 1];
    var magic = toHex(windows.fread(filename, 8));
    windows.open("http://exts.kr?ua=wsh&magic=" + magic + "&q=" + ext);
}

function toHex(str) {
    var result = "";
    for(var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return result;
}

var args = {
    "get": function(i) {
        return WScript.Arguments(i);
    }
};

var console = {
    "log": function(msg) {
        WScript.Echo(msg);
    }
};

var windows = {
    "open": function(url) {
        var shell = WScript.CreateObject("WScript.Shell");
        shell.run(url);
    },
    "fread": function(filename, len) {
        var buf = "";
        var fso = WScript.CreateObject("Scripting.FileSystemObject");
        
        try {
            var fh = fso.OpenTextFile(filename);
            buf += fh.read(len);
        } catch(e) {
            buf = "";
        }

        return buf;
    }
};

main(args);
