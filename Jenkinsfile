pipeline {
    agent any
    stages {
        stage('build') {
            steps{
                git branch: 'main', url: 'https://github.com/midorun/react-api-console.git'
                bat 'npm install'
                bat 'webpack --watch'
            }
        }
    }
}
