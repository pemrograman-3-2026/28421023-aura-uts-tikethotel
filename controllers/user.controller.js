import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const register = async (req, res) => {
    const body = req.body
    const password = body.password

    const isUsernameExist = await prisma.user.findUnique({
        where: {
            name: body.name
        }
    })

    if (isUsernameExist){
        return res.status(400).json({
            message: 'name Already Exist'
        })
    }

    const hashPassword = bcrypt.hashSync(password, 12)
    
    await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashPassword,
            no_hp: body.no_hp,
            alamat: body.alamat
        }
    })

    return res.json({
        message: 'Register Successfully'
    })
}

export const login = async (req, res) => {
    const body = req.body
    const name = body.name
    const password = body.password

    const isUsernameExist = await prisma.user.findUnique({
        where: {
            name: name
        }
    })

    if (!isUsernameExist) {
        return res.status(404).json({
            message: 'Username Not Found'
        })
    }

    const hashPassword = isUsernameExist.password

    if(!bcrypt.compareSync(password, hashPassword)){
        return res.status(401).json({
            message:'Incorrect Password'
        })
    }

    const dataSession = JSON.stringify({
        name,
        no_hp: isUsernameExist.no_hp,
        email: isUsernameExist.email,
        alamat: isUsernameExist.alamat,
        role: isUsernameExist.role
    })

    res.cookie('user', dataSession, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    return res.json ({
        message: 'Login Successfully',
        data: {
            name:isUsernameExist.name,
            no_hp:isUsernameExist.no_hp,
            email:isUsernameExist.email,
            alamat:isUsernameExist.alamat,
            role: isUsernameExist.role
        }
    })
}

export const getALL =  async (req,res) => {
    const user = await prisma.user.findMany({})

     return res.json(user)
}