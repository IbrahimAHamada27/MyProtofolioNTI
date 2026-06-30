const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json({}));

const MONGODB_URI = 'mongodb+srv://Ibrahim:HEMAhema2001@cluster0.nnbow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error(' Error connecting to MongoDB:', err));


const siteInfoRoutes = require('./routes/siteInfo');
const projectsRoutes = require('./routes/projects');
const certificatesRoutes = require('./routes/certificates');
const experienceRoutes = require('./routes/experience');
const messagesRoutes = require('./routes/messages');
const skillsRoutes = require('./routes/skills');

app.use('/api/siteinfo', siteInfoRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/certificates', certificatesRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/skills', skillsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
