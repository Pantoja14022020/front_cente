const keycloak = new window.Keycloak({
    url: URL_SERVER,
    realm: REALM, 
    clientId: CLIENTE_ID,
});

export default keycloak;