import {prisma} from "../lib/prisma.js"

export const create = async (req,res) => {
    const body = req.body

    await prisma.kamar.create({
        data : {
            no_kamar : body.no_kamar,
            harga : body.harga,
            id_hotel : body.id_hotel

        }
    }

    )


    return res.json ({
        message : "kamar berhasil dimasukan"
    })

}

export const getById = async (req,res) => {
    const id_kamar =req.body.id_kamar
    const kamar = await prisma.kamar.findUnique({
        where : {
            id_kamar: Number(id_kamar)
        },
        include: {
            pemesanan:true
        }
    })
    if (!kamar){
        return res.status(400).json({
            message : "data tidak ditemukan"
        })
    }
     return res.json({
        message : "berhasil mengambil data",
        data : kamar
    })
}

export const getALL =  async (req,res) => {
    const kamar = await prisma.kamar.findMany({
        include: {
            pemesanan:true
        }
    })

     return res.json({
        message : "berhasil mengambil semua data",
        data : kamar
    })
}

export const update = async (req,res) => {
    try {
        const { id_kamar, no_kamar, harga, id_hotel } = req.body

        const updateKamar = await prisma.kamar.update({
            where: {
                id_kamar: Number(id_kamar)
            },
            data: {
                no_kamar: no_kamar,
                harga: harga,
                id_hotel: id_hotel
            }, 
            include: {
                pemesanan:true
            }
        })

       return res.json({
            message: "data berhasil diperbarui",
            data: updateKamar
        })

    } catch (error) {
        
       return res.status(400).json({
            message: "data gagal diperbarui, id tidak ditemukan "
        })
    }
}

export const destroy = async (req, res) => {
    try {
        const { id_kamar } = req.body

        await prisma.kamar.delete({
            where: {
                id_kamar: Number(id_kamar)
            }
        })

        return res.json({
            message: "Data kamar berhasil dihapus"
        })
    } catch (error) {
        return res.status(400).json({
            message: "Gagal menghapus, ID tidak ditemukan"
        })
    }
}