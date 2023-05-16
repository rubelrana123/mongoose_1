import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Schema, model } from 'mongoose';
// const express = require('express')
// const mongoose = require('mongoose');
const app : Application = express();
// const port = 5000;
//using cors
app.use(cors()); 
//parse data
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.get('/', (req : Request, res : Response, next : NextFunction) => {
  //insert data into mongo

  /* 
  step 1 : interface
  step : schema
  step 3 : model
  step 4 : database query */
  //create interface

  interface IUser {
    id : string;
    role : "student";
    password : string;
    name : {
      firstName : string,
      middleName? : string,
      lastName :string
    };
    dateOfBirth? : string;
    gender : "male" | "female";
    email? : string;
    contactNo : string;
    emergencyContactNo : string;
    presentAddress : string;
    permanentAddress : string

  }

  //create schema using interafce
  const userSchema = new Schema<IUser>({
    id : {type : String, required : true, unique : true},
    role :{ type : String, required : true, unique : true},
    password : { type : String, required : true},
    name : {
      firstName : {
        type : String, required : true
      },
      middleName : {
        type : String,
      },
      lastName : {
        type : String, required : true
      }
    },
    dateOfBirth : {type : String},
    gender :  {type : String, enum : ["male", 'female' ] },
    email : {type : String},
    contactNo : {type : String, required : true},
    emergencyContactNo : {type : String, required : true},
    presentAddress : {type : String, required : true},
    permanentAddress : {type : String, required : true},
     
    
  });

  //create model
  const User = model<IUser>('User', userSchema);
  

    // res.send('Hello World!');
    // next()
  })

  export default app;