﻿import * as postcss from 'postcss';

const errorContext = {
	plugin: 'postcss-circle'
};

const PostCssCircle = postcss.plugin('postcss-circle', () => {
	return root => {
		root.walkRules(rule => {
			rule.walkDecls('circle', decl => {
				let [diameter, color] = postcss.list.space(decl.value);
				if (!/^\d/.test(diameter)) {
					[diameter, color] = [color, diameter];
				}
				if (!diameter) {
					throw decl.error('Missing diameter', errorContext);
				}
				decl.cloneBefore({
					prop: 'border-radius',
					value: '50%'
				});
				if (color) {
					decl.cloneAfter({
						prop: 'background-color',
						value: color
					});
				}
				decl.prop = 'width';
				decl.value = diameter;
				decl.cloneAfter({ prop: 'height' });
			});
		});
	};
});

export = PostCssCircle;
