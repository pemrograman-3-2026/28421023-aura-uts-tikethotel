import {prisma} from "../lib/prisma.js"

export const create = async (req,res) => {
    const body = req.body

    await prisma.pembayaran.create({
        data : {
            metode : body.metode,
            jumlah_bayar : body.jumlah_bayar,
            pemesananID : body.pemesananID

        }
    }

    )


    return res.json ({
        message : "pembayaran berhasil dimasukan"
    })

}

export const getById = async (req,res) => {
    const id_pembayaran =req.body.id_pembayaran
    const pembayaran = await prisma.pembayaran.findUnique({
        where : {
            id_pembayaran: Number(id_pembayaran)
        }
    })
    if (!pembayaran){
        return res.status(400).json({
            message : "data tidak ditemukan"
        })
    }
     return res.json({
        message : "berhasil mengambil data",
        data : pembayaran
    })
}

export const getALL =  async (req,res) => {
    const pembayaran = await prisma.pembayaran.findMany()

     return res.json({
        message : "berhasil mengambil semua data",
        data : pembayaran
    })
}

export const update = async (req,res) => {
    try {
        const { id_pembayaran, metode, jumlah_bayar, pemesananID } = req.body

        const updatepembayaran = await prisma.pembayaran.update({
            where: {
                id_pembayaran: Number(id_pembayaran)
            },
            data: {
                metode: metode,
                jumlah_bayar: jumlah_bayar,
                pemesananID: pemesananID
            }, 
            
        })

       return res.json({
            message: "data berhasil diperbarui",
            data: updatepembayaran
        })

    } catch (error) {
        
       return res.status(400).json({
            message: "data gagal diperbarui, id tidak ditemukan "
        })
    }
}

export const destroy = async (req, res) => {
    try {
        const { id_pembayaran } = req.body

        await prisma.pembayaran.delete({
            where: {
                id_pembayaran: Number(id_pembayaran)
            }
        })

        return res.json({
            message: "Data pembayaran berhasil dihapus"
        })
    } catch (error) {
        return res.status(400).json({
            message: "Gagal menghapus, ID tidak ditemukan"
        })
    }
}