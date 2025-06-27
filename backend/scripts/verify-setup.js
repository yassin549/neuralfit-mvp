import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function checkCommand(command, errorMessage) {
    try {
        await execAsync(`${command} --version`);
        return true;
    }
    catch (error) {
        console.error(`❌ ${errorMessage}`);
        return false;
    }
}
async function checkFileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    }
    catch {
        return false;
    }
}
async function verifySetup() {
    console.log('🔍 Verifying NeuralFit Backend Setup...\n');
    console.log('🛠 Checking system requirements:');
    const nodeOk = await checkCommand('node', 'Node.js is not installed or not in PATH');
    const npmOk = await checkCommand('npm', 'npm is not installed or not in PATH');
    const pythonOk = await checkCommand('python', 'Python is not installed or not in PATH');
    const gitOk = await checkCommand('git', 'Git is not installed or not in PATH');
    let gitLfsOk = false;
    try {
        await execAsync('git lfs version');
        gitLfsOk = true;
    }
    catch {
        console.error('❌ Git LFS is not installed. Required for handling large model files.');
    }
    console.log('\n🔧 Checking configuration:');
    const envExists = await checkFileExists(path.join(__dirname, '../../.env'));
    if (!envExists) {
        console.error('❌ .env file is missing. Please copy .env.example to .env and update it.');
    }
    else {
        console.log('✅ .env file exists');
    }
    console.log('\n🤖 Checking AI model setup:');
    const modelPath = process.env.AI_MODEL_PATH || './models/MentaLLaMA-chat-7B';
    const modelFiles = [
        'config.json',
        'generation_config.json',
        'model-00001-of-00002.safetensors',
        'model-00002-of-00002.safetensors',
        'model.safetensors.index.json',
        'special_tokens_map.json',
        'tokenizer.json',
        'tokenizer.model',
        'tokenizer_config.json'
    ];
    let allModelFilesExist = true;
    for (const file of modelFiles) {
        const filePath = path.join(modelPath, file);
        const exists = await checkFileExists(filePath);
        console.log(`${exists ? '✅' : '❌'} ${file}`);
        if (!exists)
            allModelFilesExist = false;
    }
    if (!allModelFilesExist) {
        console.log('\n⚠️  Some model files are missing. Please run:');
        console.log('   npm run model:download\n');
    }
    else {
        console.log('\n✅ All model files are present');
    }
    console.log('\n🐍 Checking Python packages:');
    const packages = ['torch', 'transformers', 'sentencepiece', 'huggingface-hub'];
    for (const pkg of packages) {
        try {
            await execAsync(`python -c "import ${pkg}; version = getattr(${pkg}, '__version__', 'unknown'); print(f'✅ ${pkg} {version}')"`);
        }
        catch {
            console.error(`❌ ${pkg} is not installed. Please run: pip install ${pkg}`);
        }
    }
    console.log('\n📋 Setup Summary:');
    console.log(`Node.js: ${nodeOk ? '✅' : '❌'}`);
    console.log(`npm: ${npmOk ? '✅' : '❌'}`);
    console.log(`Python: ${pythonOk ? '✅' : '❌'}`);
    console.log(`Git: ${gitOk ? '✅' : '❌'}`);
    console.log(`Git LFS: ${gitLfsOk ? '✅' : '❌'}`);
    console.log(`Environment: ${envExists ? '✅' : '❌'}`);
    console.log(`Model Files: ${allModelFilesExist ? '✅' : '❌'}`);
    if (nodeOk && npmOk && pythonOk && gitOk && gitLfsOk && envExists && allModelFilesExist) {
        console.log('\n🎉 Setup looks good! You can start the server with: npm run dev\n');
    }
    else {
        console.log('\n⚠️  Some setup steps are incomplete. Please fix the issues above.\n');
    }
}
verifySetup().catch(console.error);
//# sourceMappingURL=verify-setup.js.map