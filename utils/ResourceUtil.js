const { Resource } = require('../models/Resource');
const fs = require('fs').promises;
async function readJSON(filename) {
try {
const data = await fs.readFile(filename, 'utf8');
return JSON.parse(data);
} catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
try {
const allObjects = await readJSON(filename);
allObjects.push(object);
await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
return allObjects;
} catch (err) { console.error(err); throw err; }
}
async function addResource(req, res) {
try {
const name = req.body.name;
const location = req.body.location;
const description = req.body.description;
const owner = req.body.owner;
if (!owner.includes('@') || !owner.includes('.') || description.length < 6) {
return res.status(500).json({ message: 'Validation error' });
} else {
const newResource = new Resource(name, location, description, owner);
const updatedResources = await writeJSON(newResource,
'utils/resources.json');
return res.status(201).json(updatedResources);
}
} catch (error) {
return res.status(500).json({ message: error.message });
}
}
module.exports = {
readJSON, writeJSON, addResource
};