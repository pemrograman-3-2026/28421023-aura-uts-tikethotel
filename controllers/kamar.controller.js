import {prisma} from "../lib/prisma.js"

export const create = async (req,res) => {
    const body = req.body


    await prisma.kamar.create({
        data : {
            no_kamar : body.no_kamar,
            harga : body.harga,
            id_hotel : Number (body.id_hotel)

        }
    }

    )


    return res.json ({
        message : "kamar berhasil dimasukan"
    })

}

export const getById = async (req,res) => {
    const id_kamar =req.params.id
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
     return res.json(kamar)
}

export const getALL =  async (req,res) => {
    const kamar = await prisma.kamar.findMany({
        include: {
            hotel:true
        }
    })

     return res.json(kamar)
}

export const update = async (req, res) => {
    const idKamar = Number(req.params.id)

    await prisma.kamar.update({
        where: {
            id_kamar: idKamar
        },
        data: req.body
    })

    res.json({
        message: 'Data was updated successfully'
    })

}
export const deleteKamar = async (req, res) => {
    const idKamar = Number(req.params.id)

    await prisma.kamar.delete({
        where: {
            id_kamar: idKamar
        },

        data: req.body
    })
    res.json({
        message: 'Data was deleted successfully'
    })
}