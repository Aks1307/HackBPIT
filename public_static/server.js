let Express = require('express');
let multer = require('multer');
let bodyParser = require('body-parser');
let app = Express();

app.use(Express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set("view engine","ejs");
let Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "C:\\Users\\deepa\\Desktop\\HackBPIT\\python");
    },
    filename: function (req, file, callback) {
        callback(null, 'sample.'+file.originalname.split('.')[1]);
    }
});

let upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count
let i = 0;
app.post("/api/Upload", function (req, res) {
    i = i+1;
    if(i===1){
        upload(req, res, function (err) {
        
            console.log('Processing the File!');
            let {PythonShell} = require('python-shell');
    
            let options = {
            mode: 'text',
            pythonPath: 'C:\\Users\\deepa\\Miniconda3\\python.exe', 
            pythonOptions: ['-u'],
            scriptPath: 'C:\\Users\\deepa\\Desktop\\HackBPIT\\python'
            };
    
            // PythonShell.run('text_to_videobook.py', options, function (err, results) {
            //     if (err) throw err;
            //     else {
            //         console.log('results: %j', results);
            //         // return res.redirect('/videobook.html');
            //         return res.download('../python/sample.mp4')
            //     }
                
            // });

            let pyshell = new PythonShell('text_to_videobook.py',options);
 
            // sends a message to the Python script via stdin            
            pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
                console.log(message);
            });

            // end the input stream and allow the process to exit
            pyshell.end(function (err,code,signal) {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
            });

            if (err) {
                return res.end("Something went wrong!");
            }
            return res.redirect('/videobook.html');
        });
    }
});

app.listen(2000, function (a) {
    console.log("Listening to port 2000");
});