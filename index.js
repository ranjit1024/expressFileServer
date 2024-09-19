const env = require("dotenv").config({path:"./port.env"});
const express = require("express");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res)=>{
    res.send(`<h1 style="text-align:center; font-size:10rem; color:blue; margin:10%">Welcome to file server</h1>`)
})

app.get("/files", (req,res)=>{
    try{

        fs.readdir("./folder", (err,files)=>{
            res.json({
                
                files:files
            })
        })
    }
    catch(error){
        res.sendStatus(411).send(`<h1 style="color:red">something went Wrong</h1>`)
    }
    
})
app.get("/file", (req,res)=>{
    const file = req.query.file;
    
    fs.readdir("./folder", (error, files)=>{
        const findFile = files.find(data=>{
            return data == file;
        })
        fs.readFile(`./folder/${findFile}`, (error, data)=>{
            if(error){
                res.send(`<h1 style="color:red">${file} file not found</h1>`);
                return console.error(error);
            }else{
                res.send(`<p style="font-size:25px">${data.toString()}</p>`);
            }
        }) 
        console.log(typeof findFile) 
    })
    
    // res.send("ok")
})

app.listen(port, ()=>{
    console.log(`listing on port ${port}`)
})