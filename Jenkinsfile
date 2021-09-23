pipeline {
    agent any
    stages {
        stage('build') {
            steps{
                git branch: 'master', url: 'https://github.com/midorun/Food.git'
                bat 'npm install'
                bat 'webpack --watch'
            }
        }
    }
}
