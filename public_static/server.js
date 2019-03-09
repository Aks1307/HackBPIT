let Express = require('express');
let multer = require('multer');
let bodyParser = require('body-parser');
let app = Express();
// let filename = '';
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

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        
        console.log('Processing the File!');
        let {PythonShell} = require('python-shell');

        let options = {
        mode: 'text',
        pythonPath: 'C:\\Users\\deepa\\Miniconda3\\python.exe', 
        pythonOptions: ['-u'],
        scriptPath: 'C:\\Users\\deepa\\Desktop\\HackBPIT\\python'
        };

        PythonShell.run('text_to_videobook.py', options, function (err, results) {
            if (err) throw err;
            else {
                console.log('results: %j', results);
                // return res.redirect('/videobook.html');
                return res.download('../python/sample.mp4')
            }
            
        });
        if (err) {
            return res.end("Something went wrong!");
        }
        // return res.redirect('/videobook.html');
    });
});

app.listen(2000, function (a) {
    console.log("Listening to port 2000");
});