/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const postcssJitProps = require('postcss-jit-props');

module.exports = {
	plugins: [
		/* other plugins */
		postcssJitProps({
			files: [path.resolve(__dirname, 'node_modules/open-props/open-props.min.css')]
		}),
		/* remove autoprefixer if you had it here, it's part of postcss-preset-env */
		postcssPresetEnv({
			/* pluginOptions */
			features: {
				'nesting-rules': {
					noIsPseudoSelector: false
				}
			}
		})
	]
};
