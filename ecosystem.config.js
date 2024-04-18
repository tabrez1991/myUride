module.exports = {
  apps : [{
    script: 'npm start'
  }],

  deploy : {
    production : {
      key : 'myuride_server_chris.pem',
      user : 'ubuntu',
      host : 'api.myuride.com',
      ref  : 'origin/main',
      repo : 'https://github.com/tabrez1991/myUride.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
