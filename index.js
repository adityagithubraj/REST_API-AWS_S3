const express = require('express');
const app = express();
const dotenv = require('dotenv');
const fileRoutes = require('./routers/fileRoutes');

dotenv.config();



app.use(express.json()); 



//.....................Route................//

app.use('/', fileRoutes);

//........................Error Handling..........................//



//...............server listen.................................//

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
