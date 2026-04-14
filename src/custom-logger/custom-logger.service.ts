import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';
import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Chicago',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!fs.existsSync(path.join(process.cwd(), 'logs'))) {
        await fsPromises.mkdir(path.join(process.cwd(), 'logs'));
      }

      await fsPromises.appendFile(
        path.join(process.cwd(), 'logs', 'logFile.log'),
        formattedEntry,
      );
    } catch (error) {
      if (error instanceof Error)
        console.error(
          'An error occurred while appending data to the logFile.log',
          error.message,
        );
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;

    this.logToFile(entry);

    super.log(message, context);
  }

  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`;

    this.logToFile(entry);

    super.error(message, stackOrContext);
  }
}
