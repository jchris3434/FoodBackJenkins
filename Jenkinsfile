pipeline {
    agent any
    
    environment {
        NODE_ENV = 'test'
    }
    
    stages {
        stage('Build') {
            steps {
                script {
                    // Construire l'image Docker de l'application
                    docker.build("my-node-app")
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    // Exécuter les tests avec npm test dans le conteneur Docker
                    docker.image('my-node-app').withRun('-p 3600:3600') {
                        sh 'npm test'
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main' // Déployer uniquement depuis la branche principale
            }
            steps {
                // Utiliser Docker Compose pour démarrer l'application et la base de données
                script {
                    docker-compose up -d
                }
            }
        }
    }
    
    post {
        always {
            // Nettoyer les conteneurs et les volumes après le pipeline
            cleanWs()
            script {
                docker-compose down -v
            }
        }
    }
}
