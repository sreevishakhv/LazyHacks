const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const serverFolderPath = path.join(__dirname, '../server');
if (!fs.existsSync(serverFolderPath)) {
  fs.mkdirSync(serverFolderPath);
}

app.use('/files', express.static(serverFolderPath));

const getFolderTree = (dirPath) => {
  const items = fs.readdirSync(dirPath).map((item) => {
    const fullPath = path.join(dirPath, item);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    return {
      name: item,
      type: isDirectory ? 'folder' : 'file',
      path: fullPath,
      contents: isDirectory ? getFolderTree(fullPath) : null,
    };
  });
  return items;
};

app.get('/api/files', (req, res) => {
  const fileTree = getFolderTree(serverFolderPath);
  res.json(fileTree);
});

app.post('/api/files/create', (req, res) => {
  const { path: folderPath, type } = req.body;
  const fullPath = path.join(serverFolderPath, folderPath);
  if (type === 'folder') {
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
      res.json({ message: 'Folder created' });
    } else {
      res.status(400).json({ message: 'Folder already exists' });
    }
  } else if (type === 'file') {
    fs.writeFileSync(fullPath, '');
    res.json({ message: 'File created' });
  }
});

app.post('/api/files/delete', (req, res) => {
  const { path: itemPath } = req.body;
  const fullPath = path.join(serverFolderPath, itemPath);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    res.json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.post('/api/files/rename', (req, res) => {
  const { oldPath, newPath } = req.body;
  const fullOldPath = path.join(serverFolderPath, oldPath);
  const fullNewPath = path.join(serverFolderPath, newPath);
  if (fs.existsSync(fullOldPath)) {
    fs.renameSync(fullOldPath, fullNewPath);
    res.json({ message: 'Item renamed' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.post('/api/files/move', (req, res) => {
  const { srcPath, destPath } = req.body;
  const fullSrcPath = path.join(serverFolderPath, srcPath);
  const fullDestPath = path.join(serverFolderPath, destPath, path.basename(srcPath));
  if (fs.existsSync(fullSrcPath)) {
    fs.renameSync(fullSrcPath, fullDestPath);
    res.json({ message: 'Item moved' });
  } else {
    res.status(404).json({ message: 'Source item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
