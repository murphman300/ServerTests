module.exports = {
    apps: [{
        name: 'ServerTest',
        script: './server.js'
    }],
    deploy: {
        production: {
            user: 'ubuntu',
            host: 'ec2-34-228-59-249.compute-1.amazonaws.com',
            key: '~/.ssh/id_rsa.pub',
            ref: 'origin/master',
            repo: 'git@github.com:murphman300/ServerTests.git',
            path: '/home/ubuntu/ServerTests',
            'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
}