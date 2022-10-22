const router = require('express').Router()
const Email = require('../models/Email')
const nodemailer = require('nodemailer');
// API EMAIL:

//add email

router.post('/email', async (req, res) => {
    const email = new Email(req.body)
    try {
        const newEmail = await email.save(function (err, email) {
            if (err) {
                console.log(err)
                return err;
            }
            res.json({ status: 201, email: email })
        })
    } catch (err) {
        res.json({ status: 500, error: err })
    }
})

// edit email
router.post('/emails/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    console.log("updates", updates)
    const allowedUpdates = ["status"];
    const isValidOpreration = updates.every((update) => {
        console.log("update", update)
        allowedUpdates.includes(update)
    })
    if (isValidOpreration) {
        return res.status(404).send('invalid update')
    }
    try {
        console.log(req.body);
        const email = await Email.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!email) {
            res.status(404).send('email not found')
        }
        res.send(email)
    } catch (err) {
        console.log(err);
    }
})
//delete email
router.delete('/email/:id', async (req, res) => {
    console.log("id:" + req.params.id);
    Email.findByIdAndDelete(req.params.id, (err, email) => {
        if (err)
            res.status(400).send(err)
        console.log("success!");
        res.status(200).send(email)
    })
})


// get all emails
router.get('/emails', async (req, res) => {
    Email.find().then(emails => {
        if (!emails)
            console.log(emails);
        res.send(emails);
    })
        .catch((err) => {
            res.status(500).send(err)
        })
})
// get email by id
router.get('/email/:id', async (req, res) => {
    console.log(req.params);
    const id = req.params.id
    Email.findById(id).then((email) => {
        if (!email) {
            return res.status(404).send('email not found')
        }
        res.send(email)
    })
        .catch((err) => {
            res.status(500).send(err)
        })
})
router.post('/api/sendEmail', (req, res) => {
    console.log("send email");
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mindysahar@gmail.com',
            pass: '0583233770'
        }
    });
    //let transporter = nodemailer.createTransport('smtps://benchamo.scoop.catering%40gmail.com:0584505023@smtp.gmail.com');
    let mailList = [
        'shimonsahar@gmail.com',
        'mindifr@gmail.com',
        'mindysahar@gmail.com'
    ]
    let dataMail = req.body
    mailList.forEach(function (to, i, array) {
        let mailOptions = {
            from: 'ScoopCatering 👥 <foo@blurdybloop.com>',
            subject: dataMail.subject,
            text: dataMail.text,
            html: dataMail.html,
            to: dataMail.to,
            cc: "*******",
            // bcc: mailList,//עותק מוסתר וב to:[]
            // html: '<p>Click <a href="http://134.209.41.196' + '">here</a> to show more details in site</p>',
            attachments: [
                {
                    filename: dataMail.filename,
                    // filename: 'image1.jpg',
                    path: dataMail.image,
                    // path: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                }
            ]
        };
        mailOptions.to = to

        let mail = transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })
});
router.post('/sendEmail', (req, res) => {
    console.log("send email");
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mindysahar@gmail.com',
            pass: '0583233770'
        }
    });

    let dataMail = req.body

    let mailOptions = {
        from: 'ScoopCatering 👥 <foo@blurdybloop.com>',
        subject: dataMail.subject,
        text: dataMail.text,
        html: dataMail.html,
        to: dataMail.to,
        cc: "*******",
        // bcc: mailList,//עותק מוסתר וב to:[]
        // html: '<p>Click <a href="http://134.209.41.196' + '">here</a> to show more details in site</p>',
        // attachments: [
        //     {
        //         filename: dataMail.filename,
        //         filename: 'image1.jpg',
        //         path: dataMail.image,
        //         path: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
        //     }
        // ]
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw error;
        } else {
            console.log('Email successfully sent!');
        }
    });

});

module.exports = router