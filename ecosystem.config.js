module.exports = {
    apps: [{
        name: 'ServerTest',
        script: './server.js'
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-107-21-69-108.compute-1.amazonaws.com',
            key: '~/.ssh/autorized_keys',
            ref: 'origin/master',
            repo: 'git@github.com:murphman300/ServerTests.git',
            path: '/home/ubuntu/ServerTests',
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
}