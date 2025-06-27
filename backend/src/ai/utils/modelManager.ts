const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const { MODEL_CONFIG } = require('../models/model.config');
const modelTypes = require('../types/model.types');

const execAsync = promisify(exec);

class ModelManager {
  private static instance: ModelManager;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;
  private pythonCommand = 'python';

  private constructor() {}

  public static getInstance(): ModelManager {
    if (!ModelManager.instance) {
      ModelManager.instance = new ModelManager();
    }
    return ModelManager.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      try {
        console.log('🚀 Initializing MentaLLaMA model...');
        
        await this.checkPythonInstallation();
        await this.checkPythonDependencies();
        
        this.isInitialized = true;
        console.log('✅ Model manager initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize model manager:', error);
        throw error;
      }
    })();

    return this.initializationPromise;
  }

  private async checkPythonInstallation(): Promise<void> {
    try {
      try {
        await execAsync('python --version');
        this.pythonCommand = 'python';
      } catch {
        await execAsync('python3 --version');
        this.pythonCommand = 'python3';
      }
    } catch (error) {
      throw new Error('Python is not installed or not in PATH. Please install Python 3.8 or later.');
    }
  }

  private async checkPythonDependencies(): Promise<void> {
    const requiredPackages = ['torch', 'transformers', 'sentencepiece', 'huggingface-hub'];
    
    for (const pkg of requiredPackages) {
      try {
        await execAsync(`${this.pythonCommand} -c "import ${pkg}"`);
        console.log(`✅ ${pkg} is installed`);
      } catch {
        throw new Error(`Required Python package '${pkg}' is not installed. Please install it with: pip install ${pkg}`);
      }
    }
  }

  public async generateResponse(
    prompt: string,
    options: Partial<Omit<typeof MODEL_CONFIG, 'modelName' | 'modelPath' | 'modelUrl'>> = {}
  ): Promise<modelTypes.ModelResponse> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const scriptPath = path.join(__dirname, '..', '..', 'scripts', 'inference.py');
      const command = `"${this.pythonCommand}" "${scriptPath}" "${prompt.replace(/"/g, '\\"')}"`;
      
      console.log('🤖 Generating response...');
      const startTime = Date.now();
      
      const { stdout, stderr } = await execAsync(command, {
        env: {
          ...process.env,
          MODEL_PATH: MODEL_CONFIG.modelPath,
          MAX_NEW_TOKENS: String(options.maxNewTokens || MODEL_CONFIG.maxNewTokens),
          TEMPERATURE: String(options.temperature || MODEL_CONFIG.temperature),
          TOP_P: String(options.topP || MODEL_CONFIG.topP),
          REPETITION_PENALTY: String(options.repetitionPenalty || MODEL_CONFIG.repetitionPenalty),
          DEVICE: options.device || MODEL_CONFIG.device,
        },
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      });

      if (stderr) {
        console.warn('⚠️ Warning from Python script:', stderr);
      }

      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000; // Convert to seconds

      return {
        text: stdout.trim(),
        tokensUsed: 0,
        timeTaken,
        isSafe: true,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('❌ Error generating response:', message, error);
      throw new Error(`Failed to generate response: ${message}`);
    }
  }

  public get isModelInitialized(): boolean {
    return this.isInitialized;
  }

  public async dispose(): Promise<void> {
    this.isInitialized = false;
    this.initializationPromise = null;
  }
}

const modelManager = ModelManager.getInstance();

module.exports = {
  ...modelTypes,
  ModelManager,
  modelManager,
};
