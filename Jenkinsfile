pipeline {
  agent any
  stages {
    stage('Initialize') {
      steps {
        echo 'Initializing Turbo Flux Capacitor'
      }
    }
    stage('Build') {
      steps {
        sh '''node -v
npm -v
ls
npm install -g @ionic/app-scripts@latest --save-dev
npm install
npm run build --dev'''
      }
    }
  }
}