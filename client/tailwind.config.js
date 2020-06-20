module.exports = {
	purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './**/*.html',
      './**/*.tsx',
    ],
  },
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
	},
};
