import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { ReportsService } from './reports.service';
import axios from 'axios'; // Import axios for HTTP requests
import * as jwt from 'jsonwebtoken';// Import jsonwebtoken for JWT verification

@Controller()
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get("reports")
    async getReports(@Headers('authorization') authToken: string) {
        const token = authToken?.split(' ')[1];

        // Fetch public key from Keycloak
        const keycloakUrl = 'http://localhost:8080/realms/reports-realm'; // Update with your Keycloak URL
        const response = await axios.get(keycloakUrl);
        const publicKey = response.data.public_key // Extract the public key
        const { realm_access } = jwt.decode(token);
        if (realm_access.roles[0] !== "prothetic_user") {
            throw new UnauthorizedException('Restricted access to the role');
        }
        // Verify the JWT token
        try {
            jwt.verify(token, `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----\n`, { algorithms: ['RS256'] });
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException('Invalid token'); // Throw an exception if token is invalid
        }

        return this.reportsService.getReports();
    }
} 