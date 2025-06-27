import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function findPython() {
    const venvPython = path.join('.venv', 'Scripts', 'python.exe');
    const commands = [venvPython, 'py', 'python', 'python3'];
    for (const cmd of commands) {
        try {
            if (cmd === venvPython && !fs.existsSync(venvPython)) {
                continue;
            }
            const { stdout } = await execAsync(`"${cmd}" --version`);
            console.log(`✅ Python found using "${cmd}": ${stdout.trim()}`);
            return cmd;
        }
        catch {
        }
    }
    console.error('❌ Python is required but not found. Please install Python and ensure it is in your PATH.');
    process.exit(1);
}
async function checkDependencies(pythonCmd) {
    console.log('🐍 Checking Python module path...');
    try {
        const { stdout } = await execAsync(`"${pythonCmd}" -c "import sys; print(sys.path)"`);
        console.log(stdout);
    }
    catch (e) {
        console.error('Could not get python path');
    }
    console.log('🔍 Checking for required Python packages...');
    const requiredPackages = ['torch', 'transformers', 'sentencepiece', 'huggingface-hub'];
    const missingPackages = [];
    for (const pkg of requiredPackages) {
        try {
            await execAsync(`"${pythonCmd}" -c "import ${pkg}"`);
            console.log(`✅ ${pkg} is installed`);
        }
        catch {
            console.log(`⚠️  Package "${pkg}" not found.`);
            missingPackages.push(pkg);
        }
    }
    if (missingPackages.length > 0) {
        console.error('\n❌ Some required Python packages are missing.');
        console.error('Please install them manually by running the following command:');
        console.error(`\n  "${pythonCmd}" -m pip install ${missingPackages.join(' ')}\n`);
        process.exit(1);
    }
}
async function downloadModel() {
    try {
        console.log('--- SCRIPT START ---');
        console.log('🚀 Starting MentaLLaMA model setup...');
        console.log('--- CHECKING PYTHON ---');
        const pythonCmd = await findPython();
        console.log(`--- PYTHON CHECKED: Using command "${pythonCmd}" ---`);
        console.log('--- CHECKING DEPENDENCIES ---');
        await checkDependencies(pythonCmd);
        console.log('--- DEPENDENCIES CHECKED ---');
        const scriptPath = path.join(__dirname, 'download-model.py');
        console.log('--- CREATING MODELS DIRECTORY ---');
        const modelsDir = path.join(process.cwd(), 'models');
        try {
            await fsPromises.mkdir(modelsDir, { recursive: true });
            console.log(`📁 Created models directory at: ${modelsDir}`);
        }
        catch (error) {
            if (error.code !== 'EEXIST') {
                throw error;
            }
        }
        console.log('⬇️  Starting model download (this may take a while, ~13GB)...');
        const { stderr } = await execAsync(`"${pythonCmd}" "${scriptPath}"`, { maxBuffer: 1024 * 1024 * 10 });
        if (stderr) {
            console.error('⚠️  Warning during download:', stderr);
        }
        console.log('✅ Model setup completed successfully!');
        console.log('💡 You can now start the server with: npm run dev');
        await verifyModelFiles();
    }
    catch (error) {
        console.error('❌ Error setting up model:', error.message);
        console.log('\nTroubleshooting tips:');
        console.log('1. Make sure you have enough disk space (at least 15GB free)');
        console.log('2. Check your internet connection');
        console.log('3. Try running the script again');
        console.log('4. If the download fails, you can manually download the model from Hugging Face');
        console.log('   and place it in the models/ directory');
        process.exit(1);
    }
}
async function verifyModelFiles() {
    console.log('🔍 Verifying model files...');
    const requiredFiles = [
        'config.json',
        'pytorch_model.bin',
        'tokenizer.json',
        'tokenizer_config.json',
        'special_tokens_map.json',
        'generation_config.json'
    ];
    const modelPath = path.join(process.cwd(), 'models', 'MentaLLaMA-chat-7B');
    try {
        const files = await fsPromises.readdir(modelPath);
        const missingFiles = requiredFiles.filter(file => !files.includes(file));
        if (missingFiles.length > 0) {
            console.warn('⚠️  Some model files are missing:', missingFiles);
            console.log('Please make sure the model was downloaded correctly.');
            return false;
        }
        console.log('✅ All required model files are present');
        return true;
    }
    catch (error) {
        console.error('❌ Error verifying model files:', error.message);
        return false;
    }
}
downloadModel();
//# sourceMappingURL=download-model.js.map