import http, { Server } from 'node:http'
import os from 'node:os'
import fs, { writeFile }  from 'node:fs/promises'
import path from 'node:path'

const fecha = new Date()
const memoria = (os.freemem()/1024/1024/1024)
const memoriaTotal = (os.totalmem())
const cpu = JSON.stringify(os.cpus())
const tiempo = os.uptime()
const interfaces = JSON.stringify(os.networkInterfaces())

const log = `Fecha: ${fecha} \n Memoria libre: ${memoria} \n Memoria total: ${memoriaTotal} \n CPU: ${cpu} \n Tiempo de actividad: ${tiempo} \n Interfaces de red: ${interfaces}`

const dia = new Date();
const fechaNombre = dia.getDate()
const pathArchivo = path.join(`log(${fechaNombre}).txt`)
// const pathArchivo = path.join(`log(${fecha}).txt`); Para fecha completa

const server = http.createServer((peticion, respuesta)=>{
    const ruta = peticion.url
    const metodo = peticion.method

    writeFile(pathArchivo, log, 'utf8')
        .then(()=>{
            console.log('Archivo creado')
            respuesta.end('Archivo creado')
        })
        .catch((error)=>{
            console.log('Error al crear el archivo')
            respuesta.end('Error al crear el archivo')
        })
});

server.listen(3000)

