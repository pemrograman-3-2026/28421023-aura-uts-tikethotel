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
    const id_hotel =req.body.id_hotel
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
     return res.json({
        message : "berhasil mengambil data produk",
        data : hotel
    })
}

export const getALL =  async (req,res) => {
    const hotel = await prisma.hotel.findMany({
        include: {
            kamar:true
        }
    })

     return res.json({
        message : "berhasil mengambil semua data",
        data : hotel
    })
}

export const update = async (req,res) => {
    try {
        const { id_hotel, nama_hotel, kota, alamat } = req.body

        const updateHotel = await prisma.hotel.update({
            where: {
                id_hotel: Number(id_hotel)
            },
            data: {
                nama_hotel: nama_hotel,
                kota: kota,
                alamat: alamat
            }, 
            include: {
                kamar:true
            }
        })

       return res.json({
            message: "data berhasil diperbarui",
            data: updateHotel
        })

    } catch (error) {
        
       return res.status(400).json({
            message: "data gagal diperbarui, id tidak ditemukan "
        })
    }
}

export const destroy = async (req, res) => {
    try {
        const { id_hotel } = req.body

        await prisma.hotel.delete({
            where: {
                id_hotel: Number(id_hotel)
            }
        })

        return res.json({
            message: "Data hotel berhasil dihapus"
        })
    } catch (error) {
        return res.status(400).json({
            message: "Gagal menghapus, ID tidak ditemukan"
        })
    }
}