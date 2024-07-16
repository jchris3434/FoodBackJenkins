pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone le dépôt GitHub
                git 'https://github.com/jchris3434/FoodBackJenkins.git'
            }
        }

        stage('Install nvm and Node.js') {
            steps {
                sh '''#!/bin/bash
                # Installer nvm (Node Version Manager)
                curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

                # Charger nvm
                export NVM_DIR="$HOME/.nvm"
                [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                [ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion"

                # Installer Node.js
                nvm install 18
                nvm use 18
                '''
            }
        }

        stage('Build') {
            steps {
                dir('chemin/vers/votre/projet') {
                    // Installer les dépendances et construire le projet
                    sh '''#!/bin/bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    nvm use 18
                    npm install
                    '''
                }
            }
        }

        stage('Run tests') {
            steps {
                dir('chemin/vers/votre/projet') {
                    sh '''#!/bin/bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                    nvm use 18
                    npm test dishController.test.js
                    '''
                }
            }
        }
    }
}
