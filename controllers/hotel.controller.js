import {prisma} from "../lib/prisma.js"

export const create = async (req,res) => {
    const body = req.body

    await prisma.hotel.create({
        data : {
            nama_hotel : body.nama_hotel,
            kota : body.kota,
            alamat : body.alamat

        }
    }

    )


    return res.json ({
        message : "hotel berhasil dimasukan"
    })

}

export const getById = async (req,res) => {
    const id_hotel =req.params.id
    const hotel = await prisma.hotel.findUnique({
        where : {
            id_hotel : Number(id_hotel)
        },
        include: {
            kamar:true
        }
    })
    if (!hotel){
        return res.status(400).json({
            message : "data tidak ditemukan"
        })
    }
     return res.json(hotel)
}

export const getALL =  async (req,res) => {
    const hotel = await prisma.hotel.findMany({})

     return res.json(hotel)
}

export const update = async (req, res) => {
    const idHotel = Number(req.params.id)

    await prisma.hotel.update({
        where: {
            id_hotel: idHotel
        },
        data: req.body
    })

    res.json({
        message: 'Data was updated successfully'
    })

}

export const deleteHotel = async (req, res) => {
    const idHotel = Number(req.params.id)

    await prisma.hotel.delete({
        where: {
            id_hotel: idHotel
        }
    })
    res.json({
        message: 'Data was deleted successfully'
    })
}