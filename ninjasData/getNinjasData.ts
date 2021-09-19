import path from 'path';
import fs from 'fs';

export default (): string => {
    const DATA_FILE_PATH = `${path.resolve()}/ninjasData/ninjasData.json`;
    const isFileAvailable = fs.existsSync(DATA_FILE_PATH);
    
    if (isFileAvailable) {
        const result = fs.readFileSync(DATA_FILE_PATH);
    
       return result.toString();
    } else {
        return '{}';
    }
}