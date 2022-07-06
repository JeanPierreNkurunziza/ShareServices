// const email  = require("emailjs/email");

// exports.sendmail=(req, res, next)=> {

//     var server  = email.server.connect({
//        user:    "<sender’s-email>",
//        password:"<sender’s-password>",
//        host:    "smtp.your-email.com",
//        ssl:     true,
//        port: 465
//         });
//        server.send({
//         text:    "Your message body text",
//         from:    "<sender’s email>",
//         to:      "<recipient’s email>",
//         subject: "Your message subject",
//         attachment:
//         [
//            {data:"<html><strong>A bit of HTML text</strong></html>", alternative:true},
//            {path:"user/desktop/file.pdf", type:"application/pdf", name:"renamed.pdf"}
//         ]
//         }, function(err, message) {
//          if(err)
//          console.log(err);
//          else
//          res.json({success: true, msg: 'sent'});
//       });
//     }