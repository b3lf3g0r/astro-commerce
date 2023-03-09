module.exports = {
  apps: [
    {
      name: '@product',
      script: 'src/server.js',
      instances: 4,
      autorestart: true,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/err.log',
      watch: '.',
      increment_var: 'PORT',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
    },
  ],
  deploy: {
    production: {
      user: '',
      host: '',
      ref: 'origin/main',
      repo: 'git@https://github.com/b3lf3g0r/astro-commerce.git',
      path: '/home/b3lf3g0r/astro-commerce',
      'post-deploy': 'npm i && pm2 reload ecosystem.config.cjs',
    },
  },
};
