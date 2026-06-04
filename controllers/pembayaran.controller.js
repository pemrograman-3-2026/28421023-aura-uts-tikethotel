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
    const id_pembayaran =req.params.id
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
     return res.json(pembayaran)
}

export const getALL =  async (req,res) => {
    const pembayaran = await prisma.pembayaran.findMany()

     return res.json(pembayaran)
}

export const update = async (req, res) => {
    const idPembayaran = Number(req.params.id)

    await prisma.pembayaran.update({
        where: {
            id_pembayaran: idPembayaran
        },
        data: req.body
    })

    res.json({
        message: 'Data was updated successfully'
    })

}
export const deletePembayaran = async (req, res) => {
    const idPembayaran = Number(req.params.id)

    await prisma.pembayaran.delete({
        where: {
            id_pembayaran: idPembayaran
        },

        data: req.body
    })
    res.json({
        message: 'Data was deleted successfully'
    })
}