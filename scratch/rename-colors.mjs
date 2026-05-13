import fs from 'fs';
import path from 'path';

const filesToProcess = [];

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                walkDir(fullPath);
            }
        } else if (file.endsWith('.astro') || file.endsWith('.css') || file.endsWith('.md') || file.endsWith('.json')) {
            filesToProcess.push(fullPath);
        }
    }
}

walkDir('.');

for (const file of filesToProcess) {
    const content = fs.readFileSync(file, 'utf8');
    const newContent = content.replace(/royal-blue/g, 'midnight-indigo');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated: ${file}`);
    }
}
