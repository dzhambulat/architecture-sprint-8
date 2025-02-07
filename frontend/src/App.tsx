import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak, { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';
import ReportPage from './components/ReportPage';

const keycloakConfig: KeycloakConfig = {
    url: process.env.REACT_APP_KEYCLOAK_URL || "http://localhost:8080",
    realm: process.env.REACT_APP_KEYCLOAK_REALM || "reports-realm",
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "reports-frontend"
};

const keycloak = new Keycloak(keycloakConfig);

const keycloakInitOptions: KeycloakInitOptions = {
    pkceMethod: 'S256'
};

const App: React.FC = () => {
    return (
        <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitOptions}>
            <React.StrictMode>
                <div className="App">
                    <ReportPage />
                </div>
            </React.StrictMode>
        </ReactKeycloakProvider>
    )
};

export default App;
