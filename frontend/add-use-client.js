const fs = require('fs');
const path = require('path');

const directoriesToCheck = [
  'src/components',
  'src/app'
];

const filesToUpdate = [
  'src/components/ui/use-toast.ts',
  'src/components/toast-provider.tsx',
  'src/components/chat-ui-kit/ExpansionPanel/ExpansionPanel.jsx',
  'src/components/chat-ui-kit/StatusList/StatusList.jsx',
  'src/components/chat-ui-kit/Search/Search.jsx',
  'src/components/chat-ui-kit/MessageList/MessageList.jsx',
  'src/components/chat-ui-kit/MessageInput/MessageInput.jsx',
  'src/components/chat-ui-kit/Avatar/Avatar.jsx',
  'src/components/chat/ChatInterface.tsx'
];

function addUseClient(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has 'use client' or is a server component
    if (content.includes("'use client'") || content.includes('"use client"')) {
      console.log(`Skipping ${filePath} - already has 'use client'`);
      return;
    }
    
    // Add 'use client' at the top of the file
    const newContent = `'use client';\n\n${content}`;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Process all files
filesToUpdate.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    addUseClient(fullPath);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});

console.log('Done updating files with \'use client\' directive.');
