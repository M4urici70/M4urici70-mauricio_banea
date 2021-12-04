const { Router } = require('express');
const router = Router();


const nodemailer = require('nodemailer');




// // conexion a base de datos 




// router.get('/', (req, res) => {
//     let sql = "SELECT * FROM modelos";
//     let query = conn.query(sql, (err, results) => {
//         if (err) throw err;
//         res.render('index', {
//             results: results
//         });
//     });
// });





// // ruta para registros

// router.get('/create',  (req,res)=>{
//     res.render('create');
// })

// router.get('/index',  (req,res)=>{
//     res.render('index');
// })
// // ruta para editar registros
// router.get('/edit/:id', (req, res) =>{
//             const id = req.params.id;
//             conexion.query('SELECT * FROM modelos where id=?',[id],(error, results)=>{
//                 if(error){
//                     throw error;
//                 }else {
//                     res.render('edit.hbs', {casas:results[0]});
//                 }
//             } ) 
// })

// // ruta para eliminar registros
// router.get('/delete/:id', (req, res) =>{
//     const id = req.params.id;
//     conexion.query ('DELETE FROM modelos WHERE id = ?', [id], (error, results)=>{
//         if(error){
//             throw error;
//         }else {
//             res.redirect('/');
//         }
//     })
// })






// const crud = require ("./controllers/crud");
// const conexion = require('./database/db');
// router.post ("/save", crud.save);
// router.post("/update", crud.update);

// envio de mails

router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

     contentHTML = `
         <h1>User Information</h1>
         <ul>
             <li>Username: ${name}</li>
             <li>User Email: ${email}</li>
             <li>PhoneNumber: ${phone}</li>
       </ul>
         <p>${message}</p>
 `;

    let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'alf.harris28@ethereal.email',
                pass: 'ynmDK3SSU6dQfU4aPT'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

    let info = await transporter.sendMail({
        from: '"ethereal Server" <alf.harris28@ethereal.email>', //sender address,
        to: 'smtp.ethereal.email',
        subject: 'Website Contact Form',
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);


    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('/success.html');
});


module.exports = router;