
var db = require('./../configdb/db');
const bcrypt = require("bcrypt");
const { query } = require("express");
var jwt = require('jsonwebtoken');

//**************** Register Start Here *********************//



exports.register = (req, res, next) => {

    first_name = req.body.first_name;
    last_name = req.body.last_name;
    phone = req.body.phone;
    email = req.body.email;
    password = req.body.password;
    confirmpassword = req.body.confirmpassword;
  
    // check unique email address
  
    var sql = "SELECT * FROM user WHERE email =?";
    db.query(sql, email, function (err, data, fields) {
      if (err) throw err;
      else if (data.length > 0) {
        res.status(400).json({
          success: false,
          message: "Data Already exist",
        });
        console.log("Data Already exist");
      } else if (confirmpassword != password) {
        res.status(400).json({
          success: false,
          message: "Password & Confirm Password is not Matched",
        });
        console.log("Password & Confirm Password is not Matched");
      } else {
        // save users data into database
  
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) throw err;
          else
            var sql =
              "INSERT INTO user (first_name,last_name,phone,email,password) VALUES ?";
          var values = [[first_name, last_name, phone, email, hash]];
          var token = jwt.sign({ _id: email }, 'abcdef');
          var decode = jwt.decode(token, 'abcdef');
          console.log(token)
          db.query(sql, [values], function (err, data) {
            if (err) throw err;
            else {
              db.query(
                "SELECT * FROM user WHERE email = ?",
                [email],
                (err, results) => {
                  bcrypt.compare(password, results[0].password, (err, result) => {
                    if (!result) {
                      res.status(400).json({
                        status: false,
                        message: "Email and password does not match",
                        err: err,
                      });
                    } else {
                      res.status(200).json({
                        status: true,
                        message: "Successfully Login",
                        data: results,
                        token: token,
                        tokenpayload: decode.tokenpayload
                      });
                    }
                  });
                }
              );
            }
          });
        });
      }
    });
  
  
  };

  




//*****************    Login Start here *********************//


exports.login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email, password);
  
    db.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
      console.log(results.length);
      if (error) {
        res.json({
          status: false,
          message: "there are some error with query",
        });
      } else {
        console.log(results);
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password, (err, result) => {
            if (!result) {
              res.status(400).json({
                status: false,
  
                message: "Email and password does not match",
                err: err,
              });
            } else {
              res.status(200).json({
                status: true,
                message: "Successfully Login",
                data: results,
              });
            }
          });
        } else {
          res.status(400).json({
            status: false,
            status: 400,
            message: "Email does not exits",
          });
        }
      }
    });
  };