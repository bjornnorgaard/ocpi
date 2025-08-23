# OCPI 2.3.0 OpenAPI Specification

This directory contains a comprehensive OpenAPI 3.1.0 specification for OCPI (Open Charge Point Interface) version 2.3.0.

## Overview

The specification is split across multiple files for maintainability and covers all core and optional modules in OCPI 2.3.0:

- **Versions** - API version discovery
- **Credentials** - Authentication and authorization setup
- **Locations** - Charging location and EVSE information
- **Tariffs** - Pricing and tariff information  
- **Tokens** - EV driver identification and authorization
- **Sessions** - Charging session management
- **CDRs** - Charge Detail Records for billing
- **Commands** - Remote charging commands
- **Charging Profiles** - Smart charging profiles
- **Hub Client Info** - Hub client information

## File Structure

```
openapi/2.3.0/
├── openapi.yaml                    # Main OpenAPI specification file
├── components/
│   ├── securitySchemes.yaml        # Security definitions
│   ├── parameters/
│   │   └── common.yaml             # Common parameters
│   ├── responses/
│   │   └── common.yaml             # Common responses
│   └── schemas/
│       ├── enums.yaml              # OCPI enumerations
│       ├── common.yaml             # Common schemas and data types
│       ├── versions.yaml           # Versions module schemas
│       ├── credentials.yaml        # Credentials module schemas
│       ├── locations.yaml          # Locations module schemas
│       ├── tariffs.yaml            # Tariffs module schemas
│       ├── tokens.yaml             # Tokens module schemas
│       ├── sessions.yaml           # Sessions module schemas
│       ├── cdrs.yaml               # CDRs module schemas
│       └── commands.yaml           # Commands module schemas
├── paths/
│   ├── versions.yaml               # Versions endpoints
│   ├── credentials.yaml            # Credentials endpoints
│   ├── locations.yaml              # Locations endpoints
│   ├── tariffs.yaml                # Tariffs endpoints
│   ├── tokens.yaml                 # Tokens endpoints
│   ├── sessions.yaml               # Sessions endpoints
│   ├── cdrs.yaml                   # CDRs endpoints
│   ├── commands.yaml               # Commands endpoints
│   ├── chargingprofiles.yaml       # Charging Profiles endpoints
│   └── hubclientinfo.yaml          # Hub Client Info endpoints
├── package.json                    # Node.js dependencies
├── bundle.js                       # Bundling script
├── validate.js                     # Validation script
└── dist/
    └── ocpi-2.3.0-bundled.yaml     # Single bundled file (generated)
```

## Setup

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

1. Navigate to the OpenAPI directory:
```bash
cd openapi/2.3.0
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Generate Bundled Specification

To create a single bundled YAML file with all `$ref` references resolved:

```bash
npm run bundle
```

This will:
- Read the main `openapi.yaml` file
- Resolve all `$ref` references to external files
- Generate `dist/ocpi-2.3.0-bundled.yaml`

### Validate Specifications

To validate both the source and bundled specifications:

```bash
npm run validate
```

This will:
- Validate the multi-file source specification
- Validate the bundled specification (if it exists)
- Compare metrics between source and bundled versions

### Run Both Operations

To bundle and validate in one command:

```bash
npm test
```

## Customization

### Adding New Modules

1. Create schema files in `components/schemas/`
2. Create path definitions in `paths/`
3. Update the main `openapi.yaml` to reference the new files
4. Run bundling and validation

### Modifying Existing Modules

1. Edit the relevant schema or path files
2. Ensure references are updated accordingly
3. Re-run bundling and validation

## Integration

### Using the Bundled Specification

The generated `dist/ocpi-2.3.0-bundled.yaml` can be used with:

- **OpenAPI Generators** - Generate client SDKs and server stubs
- **API Documentation** - Generate interactive docs with Swagger UI/ReDoc
- **API Testing** - Import into Postman, Insomnia, or other API testing tools
- **API Validation** - Validate requests/responses in your application

### Example with Swagger UI

```bash
# Install swagger-ui-cli globally
npm install -g swagger-ui-cli

# Serve the bundled spec
swagger-ui-cli -f dist/ocpi-2.3.0-bundled.yaml -p 8080
```

### Example with OpenAPI Generator

```bash
# Generate a Python client
openapi-generator-cli generate -i dist/ocpi-2.3.0-bundled.yaml -g python -o ./ocpi-python-client

# Generate a Node.js server stub  
openapi-generator-cli generate -i dist/ocpi-2.3.0-bundled.yaml -g nodejs-express-server -o ./ocpi-node-server
```

## Validation and Compliance

This OpenAPI specification aims to accurately represent OCPI 2.3.0 but should be validated against the official OCPI specification before production use:

- **Official OCPI Spec**: https://github.com/ocpi/ocpi
- **OCPI 2.3.0 Documentation**: https://evroaming.org/

## Contributing

When contributing to this OpenAPI specification:

1. Ensure your changes align with the official OCPI 2.3.0 specification
2. Maintain the modular file structure
3. Update both schema and path definitions as needed
4. Run validation after changes
5. Test the bundled output with OpenAPI tools

## License

This OpenAPI specification follows the same license as the OCPI specification:
- **License**: CC BY-SA 4.0
- **URL**: https://creativecommons.org/licenses/by-sa/4.0/

## Support

For questions about this OpenAPI specification:
- Review the official OCPI documentation
- Check existing GitHub issues
- Create a new issue with detailed information

For questions about OCPI itself, please refer to the EV Roaming Foundation and the official OCPI repository.