pipeline {
  agent any

  tools {
    nodejs 'nodejs'  
  }

  environment {
    IMAGE_NAME = 'my-express-app'
    DOCKER_TAG = 'latest'
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

    stage('Push to DockerHub') {
  steps {
    withDockerRegistry([credentialsId: 'dockerhub-creds', url: '']) {
      script {
        def localImage = "${IMAGE_NAME}:${DOCKER_TAG}" // e.g., my-express-app:latest
        def remoteImage = "thirumalaiboobathi/my-express-app:${DOCKER_TAG}" // e.g., thirumalaiboobathi/my-express-app:latest

        // Tag the image correctly for Docker Hub
        sh "docker tag ${localImage} ${remoteImage}"

        // Push the image to Docker Hub
        sh "docker push ${remoteImage}"
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
