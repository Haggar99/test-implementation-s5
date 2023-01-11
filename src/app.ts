import express = require('express');
import bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const etudiantRouter = require('./routes/etudiant.routes');
const enseignantRouter = require('./routes/enseignant.routes');
const adminRouter = require('./routes/admin.routes');

const coursRouter = require('./routes/cours.routes');





app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(morgan('dev'));

app.use(
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Credentials', 1);
    next();
    }

);

app.use('/api/etudiant', etudiantRouter);
app.use('/api/enseignant', enseignantRouter);
app.use('/api/admin', adminRouter);
app.use(coursRouter);


export default app;

