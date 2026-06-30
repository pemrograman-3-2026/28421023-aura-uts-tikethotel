import {prisma} from "../lib/prisma.js"
import { title } from "process";
import { existsSync, unlink, unlinkSync } from "fs"

const removeFilesFromStatic = async (filename) => {
    existsSync(`./uploads/${filename}`) && unlinkSync(`./uploads/${filename}`);
}

export const create = async (req,res) => {
    const filename = req.file.filename
    const body = req.body

    await prisma.pemesanan.create({
        data : {
            total_harga : body.total_harga,
            userID : Number(body.userID),
            kamarID : Number(body.kamarID),
            image: filename

        }
    }

    )


    return res.json ({
        message : "pemesanan berhasil dimasukan"
    })

}

export const getById = async (req,res) => {
    const id_pemesanan =req.params.id
    const pemesanan = await prisma.pemesanan.findUnique({
        where : {
            id_pemesanan: Number(id_pemesanan)
        },
        include: {
            pembayaran:true
        }
    })
    if (!pemesanan){
        return res.status(400).json({
            message : "data tidak ditemukan"
        })
    }
     return res.json(pemesanan)
}

export const getALL =  async (req,res) => {
    const pemesanan = await prisma.pemesanan.findMany({
        include: {
            user: true,
            kamar: true
        }
    })

     return res.json(pemesanan)
}

export const update = async (req, res) => {
    const idPemesanan = Number(req.params.id)

    await prisma.pemesanan.update({
        where: {
            id_pemesanan: idPemesanan
        },
        data: req.body
    })

    res.json({
        message: 'Data was updated successfully'
    })

}
export const deletePemesanan = async (req, res) => {
    const idPemesanan = Number(req.params.id)

    await prisma.pemesanan.delete({
        where: {
            id_pemesanan: idPemesanan
        },

        data: req.body
    })
    res.json({
        message: 'Data was deleted successfully'
    })
}