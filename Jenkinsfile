pipeline {
  agent any

  environment {
    IMAGE_NAME = 'my-express-app'
    DOCKER_TAG = 'latest'
    NODE_HOME = tool name: 'nodejs', type: 'NodeJS'
    PATH = "${NODE_HOME}/bin:${env.PATH}"
  }

tools {
    nodejs 'nodejs'  // Use the name from Global Tool Configuration
  }

  stages {
    

    stage('Install Dependencies') {
      steps {
        sh 'npm install --legacy-peer-deps'
      }
    }

    stage('Run Unit Tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${IMAGE_NAME}:${DOCKER_TAG}")
        }
      }
    }

    stage('Push to DockerHub (Optional)') {
      when {
        expression { env.DOCKER_USERNAME && env.DOCKER_PASSWORD }
      }
      steps {
        withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
          script {
            docker.image("${IMAGE_NAME}:${DOCKER_TAG}").push()
          }
        }
      }
    }
  }

  post {
    always {
      echo 'Pipeline finished.'
    }
    success {
      echo 'Success! Your image is ready.'
    }
    failure {
      echo 'Pipeline failed. Check the logs.'
    }
  }
}