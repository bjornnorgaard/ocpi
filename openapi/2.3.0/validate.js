#!/usr/bin/env node

const SwaggerParser = require('@apidevtools/swagger-parser');
const path = require('path');
const fs = require('fs');

async function validateOCPISpec() {
  try {
    console.log('🔍 Validating OCPI 2.3.0 OpenAPI specification...');
    
    const inputFile = path.join(__dirname, 'openapi.yaml');
    const bundledFile = path.join(__dirname, 'dist', 'ocpi-2.3.0-bundled.yaml');
    
    // Validate the original specification
    console.log('📖 Validating source specification...');
    const api = await SwaggerParser.validate(inputFile);
    console.log('✅ Source specification is valid!');
    
    // Validate the bundled specification if it exists
    if (fs.existsSync(bundledFile)) {
      console.log('📦 Validating bundled specification...');
      const bundledApi = await SwaggerParser.validate(bundledFile);
      console.log('✅ Bundled specification is valid!');
      
      // Compare some basic metrics
      const originalPaths = Object.keys(api.paths || {}).length;
      const bundledPaths = Object.keys(bundledApi.paths || {}).length;
      
      const originalSchemas = Object.keys(api.components?.schemas || {}).length;
      const bundledSchemas = Object.keys(bundledApi.components?.schemas || {}).length;
      
      console.log('\n📊 Validation Summary:');
      console.log(`   Original paths: ${originalPaths}`);
      console.log(`   Bundled paths: ${bundledPaths}`);
      console.log(`   Original schemas: ${originalSchemas}`);
      console.log(`   Bundled schemas: ${bundledSchemas}`);
      
      if (originalPaths === bundledPaths && originalSchemas >= bundledSchemas) {
        console.log('✅ Path and schema counts match expectations!');
      } else {
        console.warn('⚠️  Path or schema counts differ - please review bundling process');
      }
    } else {
      console.log('ℹ️  Bundled file not found - run bundling first');
    }
    
    console.log('\n🎉 Validation completed successfully!');
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    
    if (error.details) {
      console.error('\n📋 Validation errors:');
      error.details.forEach((detail, index) => {
        console.error(`   ${index + 1}. ${detail.message}`);
        if (detail.path) {
          console.error(`      Path: ${detail.path.join(' → ')}`);
        }
      });
    }
    
    process.exit(1);
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  validateOCPISpec()
    .then(() => {
      console.log('\n✨ OCPI 2.3.0 OpenAPI validation completed!');
    })
    .catch((error) => {
      console.error('💥 Validation failed:', error);
      process.exit(1);
    });
}

module.exports = validateOCPISpec;