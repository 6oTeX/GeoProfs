import { defineConfig } from "cypress";
import * as fs from "fs";
import * as path from "path";

export default defineConfig({
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      on("task", {
        deleteFolder(folderName) {
          return new Promise((resolve, reject) => {
            if (fs.existsSync(folderName)) {
              try {
                fs.rmdirSync(folderName, { recursive: true });
                return resolve(null);
              } catch (err) {
                return reject(err);
              }
            }
            return resolve(null);
          });
        },
      });
      // implement node event listeners here
    },
  },
});
