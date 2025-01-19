import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
    getReports() {
        return {
            reports: [
                {
                    id: 1,
                    name: 'Sample Report',
                    date: new Date(),
                },
            ],
        };
    }
} 