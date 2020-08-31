const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

const PORT = config.PORT
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Hello from Server'})
})

app.use('/api', authRoutes)
app.use('/api', adminRoutes);

async function start()
{
    try {
        await mongoose.connect(config.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
          })
          app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message)
    }
}

start()