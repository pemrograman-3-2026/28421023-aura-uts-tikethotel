import express from 'express'
import UserRoute from './routers/user.route.js'
import HotelRoute from './routers/hotel.route.js'
import KamarRoute from './routers/kamar.route.js'
import PemesananRoute from './routers/pemesanan.route.js'
import PembayaranRoute from './routers/pembayaran.route.js'
import path from 'path'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())

const imagepath = express.static(path.join(process.cwd(), 'uploads'))
app.use('/image', imagepath)

app.get('/', (req, res) => {
    res.send("Helloworld!")
})

app.use('/user', UserRoute)
app.use('/hotel', HotelRoute)
app.use('/kamar', KamarRoute)
app.use('/pemesanan', PemesananRoute)
app.use('/pembayaran', PembayaranRoute)


app.listen(3000, () => {
    console.log('server started')
})