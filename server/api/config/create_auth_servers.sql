
drop table AUTH_SERVERS;

-- Authentication Servers for LDAP or SAML mode
create table AUTH_SERVERS
(
    AS_CODE              VARCHAR2(100)   NOT NULL,
    AS_NAME              VARCHAR2(200)   NOT NULL,
    AS_IP                VARCHAR2(256)   NOT NULL,
    AS_USERNAME          VARCHAR2(100),    -- default admin username
    AS_PASSWORD          VARCHAR2(512),    -- default admin password
    AS_BASE_DN           VARCHAR2(256)   NOT NULL,    -- base DN: OU=Rowville,DC=corp,DC=diamondkey,DC=com
    AS_FILTERS           VARCHAR2(256)   NOT NULL,    -- (|(sAMAccountName=$username)(userprincipalname=$username))
    AS_RETURNS           VARCHAR2(512),
    AS_TYPE              VARCHAR2(100)   NOT NULL,    -- LDAP or SAML
    AS_NOTE              VARCHAR2(1000),
    AS_ROLE              NUMBER(9),
    AS_ACTIVE            NUMBER(1)       DEFAULT 0,
    CONSTRAINT PK_AUTH_SERVERS PRIMARY KEY(AS_CODE)
);

INSERT INTO AUTH_SERVERS (AS_CODE, AS_NAME, AS_IP, AS_USERNAME, AS_PASSWORD, AS_BASE_DN, AS_FILTERS, AS_RETURNS, AS_TYPE, AS_NOTE, AS_ROLE, AS_ACTIVE) 
VALUES ('corp.diamondkey.com', 'DKI Active Directory Test', 'ldap://10.2.20.253', 'SAMLtesting', 'SAMLtesting', 'OU=Rowville,DC=corp,DC=diamondkey,DC=com', 'sAMAccountName|userprincipalname', '', 'LDAP', 'LDAP authentication using Active Directory', 9, 1);

/*
INSERT INTO AUTH_SERVERS (AS_CODE, AS_NAME, AS_IP, AS_USERNAME, AS_PASSWORD, AS_BASE_DN, AS_FILTERS, AS_RETURNS, AS_TYPE, AS_NOTE, AS_ROLE, AS_ACTIVE) 
VALUES ('AS_CODE', 'AS_NAME', 'AS_IP', 'AS_USERNAME', 'AS_PASSWORD', 'AS_BASE_DN', 'AS_FILTERS', 'AS_RETURNS', 'LDAP', 'LDAP authentication using Active Directory', 9, 1);

INSERT INTO AUTH_SERVERS (AS_CODE, AS_NAME, AS_IP, AS_USERNAME, AS_PASSWORD, AS_BASE_DN, AS_FILTERS, AS_RETURNS, AS_TYPE, AS_NOTE, AS_ROLE, AS_ACTIVE) 
VALUES ('AS_CODE', 'AS_NAME', 'AS_IP', 'AS_USERNAME', 'AS_PASSWORD', 'AS_BASE_DN', 'AS_FILTERS', 'AS_RETURNS', 'SAML', 'SAML authentication using SAML mode', 9, 1);
*/

COMMIT;
