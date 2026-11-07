pipeline {
  agent any

  tools {
    // Configure a Jenkins NodeJS installation named "Node22" before using this pipeline.
    nodejs 'Node22'
  }

  options {
    timestamps()
    disableConcurrentBuilds()
    timeout(time: 30, unit: 'MINUTES')
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm install --no-audit --no-fund'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Validate') {
      steps {
        sh 'npm run validate'
        sh 'npm run smoke:demo'
      }
    }

    stage('Playwright tests') {
      steps {
        sh 'npm test'
      }
    }
  }

  post {
    always {
      junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
      archiveArtifacts allowEmptyArchive: true, artifacts: 'playwright-report/**,test-results/**'
    }
  }
}
