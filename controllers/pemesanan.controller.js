import {prisma} from "../lib/prisma.js"

export const create = async (req,res) => {
    const body = req.body

    await prisma.pemesanan.create({
        data : {
            total_harga : body.total_harga,
            userID : body.userID,
            kamarID : body.kamarID

        }
    }

    )


    return res.json ({
        message : "pemesanan berhasil dimasukan"
    })

}

export const getById = async (req,res) => {
    const id_pemesanan =req.body.id_pemesanan
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
     return res.json({
        message : "berhasil mengambil data",
        data : pemesanan
    })
}

export const getALL =  async (req,res) => {
    const pemesanan = await prisma.pemesanan.findMany({
        include: {
            pembayaran:true
        }
    })

     return res.json({
        message : "berhasil mengambil semua data",
        data : pemesanan
    })
}

export const update = async (req,res) => {
    try {
        const { id_pemesanan, total_harga, userID, kamarID } = req.body

        const updatepemesanan = await prisma.pemesanan.update({
            where: {
                id_pemesanan: Number(id_pemesanan)
            },
            data: {
                total_harga: total_harga,
                userID: userID,
                kamarID: kamarID
            }, 
            include: {
                pembayaran:true
            }
        })

       return res.json({
            message: "data berhasil diperbarui",
            data: updatepemesanan
        })

    } catch (error) {
        
       return res.status(400).json({
            message: "data gagal diperbarui, id tidak ditemukan "
        })
    }
}

export const destroy = async (req, res) => {
    try {
        const { id_pemesanan } = req.body

        await prisma.pemesanan.delete({
            where: {
                id_pemesanan: Number(id_pemesanan)
            }
        })

        return res.json({
            message: "Data pemesanan berhasil dihapus"
        })
    } catch (error) {
        return res.status(400).json({
            message: "Gagal menghapus, ID tidak ditemukan"
        })
    }
}