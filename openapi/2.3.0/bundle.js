#!/usr/bin/env node

const SwaggerParser = require('@apidevtools/swagger-parser');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const { mkdirp } = require('mkdirp');

async function bundleOCPISpec() {
  try {
    console.log('🔄 Starting OCPI 2.3.0 OpenAPI bundling process...');
    
    const inputFile = path.join(__dirname, 'openapi.yaml');
    const outputDir = path.join(__dirname, 'dist');
    const outputFile = path.join(outputDir, 'ocpi-2.3.0-bundled.yaml');
    
    // Ensure output directory exists
    await mkdirp(outputDir);
    
    console.log(`📖 Reading OpenAPI spec from: ${inputFile}`);
    
    // Parse and dereference the OpenAPI specification
    const api = await SwaggerParser.dereference(inputFile);
    
    // Convert to YAML string
    const yamlContent = yaml.dump(api, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
      sortKeys: false
    });
    
    // Write the bundled spec to output file
    fs.writeFileSync(outputFile, yamlContent, 'utf8');
    
    console.log(`✅ Successfully bundled OCPI 2.3.0 OpenAPI specification!`);
    console.log(`📁 Output file: ${outputFile}`);
    
    // Display some statistics
    const stats = fs.statSync(outputFile);
    console.log(`📊 Bundle size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`🔧 API Title: ${api.info.title}`);
    console.log(`🔖 API Version: ${api.info.version}`);
    console.log(`🛣️  Total paths: ${Object.keys(api.paths || {}).length}`);
    console.log(`🏗️  Total schemas: ${Object.keys(api.components?.schemas || {}).length}`);
    
    return outputFile;
    
  } catch (error) {
    console.error('❌ Error bundling OpenAPI specification:', error.message);
    
    if (error.details) {
      console.error('📋 Error details:');
      error.details.forEach((detail, index) => {
        console.error(`   ${index + 1}. ${detail.message} (${detail.path})`);
      });
    }
    
    process.exit(1);
  }
}

// Run the bundling process if this script is executed directly
if (require.main === module) {
  bundleOCPISpec()
    .then((outputFile) => {
      console.log(`\n🎉 OCPI 2.3.0 OpenAPI bundling completed successfully!`);
      console.log(`   Bundled file: ${outputFile}`);
    })
    .catch((error) => {
      console.error('💥 Bundling failed:', error);
      process.exit(1);
    });
}

module.exports = bundleOCPISpec;