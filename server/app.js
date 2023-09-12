const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql2');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());

// Create a storage engine for Multer to store uploaded images
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Database connection
const db = mysql.createConnection({
    host: 'localhost', // Replace with your database host
    user: 'root', // Replace with your database username
    password: 'energypark@2016', // Replace with your database password
    database: 'adminpanel', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

//Get

app.get('/getNavbar', (req, res) => {
    db.query('SELECT * FROM navbar', (err, results) => {
        if (err) {
            console.error('Error fetching navbar content:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Navbar data not found' });
        } else {
            res.json(results);
        }
    });
});

app.get('/getCard', (req, res) => {
    db.query('SELECT * FROM cards', (err, results) => {
        if (err) {
            console.error('Error fetching cards content:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'card data not found' });
        } else {
            res.json(results);
        }
    });
});

// app.get('/getLogo', (req, res) => {
//     db.query('SELECT * FROM logo', (err, results) => {
//         if (err) {
//             console.error('Error fetching logo content:', err);
//             res.status(500).json({ error: 'Internal server error' });
//             return;
//         }
//         if (results.length === 0) {
//             res.status(404).json({ error: 'logo data not found' });
//         } else {
//             res.json(results[0]);
//         }
//     });
// });

app.get('/getQuicklink', (req, res) => {
    db.query('SELECT * FROM quicklink', (err, results) => {
        if (err) {
            console.error('Error fetching quicklink content:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'quicklink data not found' });
        } else {
            res.json(results);
        }
    });
});

app.get('/getSociallink', (req, res) => {
    db.query('SELECT * FROM sociallink', (err, results) => {
        if (err) {
            console.error('Error fetching sociallink content:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'sociallink data not found' });
        } else {
            res.json(results);
        }
    });
});

app.get('/getFooterData', (req, res) => {
    db.query('SELECT * FROM footerdata', (err, results) => {
        if (err) {
            console.error('Error fetching footerdata content:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'footerdata data not found' });
        } else {
            res.json(results);
        }
    });
});

//Updates

app.post('/updateNavBar', (req, res) => {
    const newNavId = req.body.idnavBar;
    const newNavTitle = req.body.navTitle;
    const newNavLink = req.body.navLink;
    db.query('TRUNCATE TABLE navbar', (truncateErr) => {
        if (truncateErr) {
            console.error('Error truncating navbar table:', truncateErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        db.query('INSERT INTO navbar SET idnavBar = ?, title = ?, url = ?'
            , [newNavId, newNavTitle, newNavLink], (insertErr) => {
                if (insertErr) {
                    console.error('Error inserting new navbar data:', insertErr);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                res.json({ message: 'Navbar data updated successfully' });
            });
    });
});

app.post('/updateQuicklink', (req, res) => {
    const newId = req.body.idquicklink;
    const newTitle = req.body.quicklinkTitle;
    const newLink = req.body.quicklinkUrl;
    db.query('TRUNCATE TABLE quicklink', (truncateErr) => {
        if (truncateErr) {
            console.error('Error truncating quicklink table:', truncateErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        db.query('INSERT INTO quicklink SET idquicklink = ?, quicklinkTitle = ?, quicklinkUrl = ?'
            , [newId, newTitle, newLink], (insertErr) => {
                if (insertErr) {
                    console.error('Error inserting new quicklink data:', insertErr);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                res.json({ message: 'Quicklink data updated successfully' });
            });
    });
});

app.post('/updateSociallink', (req, res) => {
    const newId = req.body.idsociallink;
    const newTitle = req.body.sociallinkIcon;
    const newLink = req.body.sociallinkUrl;
    db.query('TRUNCATE TABLE sociallink', (truncateErr) => {
        if (truncateErr) {
            console.error('Error truncating sociallink table:', truncateErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        db.query('INSERT INTO sociallink SET idsociallink = ?, sociallinkIcon = ?, sociallinkUrl = ?'
            , [newId, newTitle, newLink], (insertErr) => {
                if (insertErr) {
                    console.error('Error inserting new sociallink data:', insertErr);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                res.json({ message: 'Sociallink data updated successfully' });
            });
    });
});

app.post('/updateCard', (req, res) => {
    const newIndex = req.body.idcards;
    const newImage = req.body.cardImage;
    const newcardButtonText = req.body.cardButtonText;
    const newcardUrl = req.body.cardUrl;
    db.query('TRUNCATE TABLE cards', (truncateErr) => {
        if (truncateErr) {
            console.error('Error truncating card table:', truncateErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        db.query('INSERT INTO cards SET idcards = ?, cardImage = ?, cardButtonText = ?, cardUrl = ?'
            , [newIndex, newImage, newcardButtonText, newcardUrl], (insertErr) => {
                if (insertErr) {
                    console.error('Error inserting new card data:', insertErr);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                res.json({ message: 'Card data updated successfully' });
            });
    });
});

app.post('/updateFooterdata', (req, res) => {
    const newDesc = req.body.description;
    const newContact = req.body.contact;
    const newEmail = req.body.email;
    db.query('TRUNCATE TABLE footerdata', (truncateErr) => {
        if (truncateErr) {
            console.error('Error truncating Footer table:', truncateErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        db.query('INSERT INTO footerdata SET footerDescription = ?, footerContact = ?, footerEmail = ?'
            , [newDesc, newContact, newEmail], (insertErr) => {
                if (insertErr) {
                    console.error('Error inserting new Footer data:', insertErr);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                res.json({ message: 'Footer data updated successfully' });
            });
    });
});

// app.post('/updateLogo', (req, res) => {
//     // const newLogo = req.body.logo;
//     const newLogo = req.body.logo;
//     // Convert the base64 image data to a buffer (assuming it's base64 encoded)
//     const logoBuffer = Buffer.from(newLogo, 'base64');
//     db.query('TRUNCATE TABLE logo', (truncateErr) => {
//         if (truncateErr) {
//             console.error('Error truncating logo table:', truncateErr);
//             res.status(500).json({ error: 'Internal server error' });
//             return;
//         }
//         db.query('INSERT INTO logo (logo) VALUES (?)'
//             , [logoBuffer], (insertErr) => {
//                 if (insertErr) {
//                     console.error('Error inserting new header data:', insertErr);
//                     res.status(500).json({ error: 'Internal server error' });
//                     return;
//                 }
//                 res.json({ message: 'logo data updated successfully' });
//             });
//     });
// });

// API endpoint to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
    const { originalname, mimetype, buffer } = req.file;

    // Insert the image into the database as a BLOB
    db.query('TRUNCATE TABLE images', (truncateErr) => {
        if (truncateErr) {
            console.error('Error truncating sociallink table:', truncateErr);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        db.query(
            'INSERT INTO images (filename, mimetype, image_data) VALUES (?, ?, ?)',
            [originalname, mimetype, buffer],
            (err, result) => {
                if (err) {
                    console.error('Error uploading image:', err);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    res.json({ message: 'Image uploaded successfully' });
                }
            }
        );
    });
});
app.get('/images', (req, res) => {
    const imageId = 1;
    db.query(
        'SELECT mimetype, image_data FROM images WHERE id = ?',
        [imageId],
        (err, result) => {
            if (err) {
                console.error('Error retrieving image:', err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (result.length === 0) {
                res.status(404).json({ error: 'Image not found' });
            } else {
                const { mimetype, image_data } = result[0];
                res.setHeader('Content-Type', mimetype);
                res.send(result[0]);
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
