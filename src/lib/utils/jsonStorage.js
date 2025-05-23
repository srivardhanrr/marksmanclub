import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

/**
 * A utility to read and write JSON data to files for persistence
 */
export const jsonStorage = {
  /**
   * Read data from a JSON file
   * @param {string} filename - The name of the JSON file (without extension)
   * @param {any} defaultValue - Default value if file doesn't exist
   * @returns {any} The parsed JSON data
   */
  read: (filename, defaultValue = null) => {
    try {
      // Create the data directory path
      const dataDir = join(process.cwd(), 'data');
      const filePath = join(dataDir, `${filename}.json`);
      
      // Check if file exists
      if (!existsSync(filePath)) {
        return defaultValue;
      }
      
      // Read and parse the file
      const fileContent = readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading ${filename}.json:`, error);
      return defaultValue;
    }
  },
  
  /**
   * Write data to a JSON file
   * @param {string} filename - The name of the JSON file (without extension)
   * @param {any} data - The data to write
   * @returns {boolean} Success status
   */
  write: (filename, data) => {
    try {
      // Create the data directory if it doesn't exist
      const dataDir = join(process.cwd(), 'data');
      if (!existsSync(dataDir)) {
        mkdirSync(dataDir, { recursive: true });
      }
      
      // Write the data as JSON
      const filePath = join(dataDir, `${filename}.json`);
      writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error(`Error writing ${filename}.json:`, error);
      return false;
    }
  }
};
