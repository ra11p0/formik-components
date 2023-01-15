import groovy.json.JsonSlurperClassic
import groovy.json.*

void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/ra11p0/formik-components"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

def jsonSlurpLax(String jsonText){
    return new JsonSlurperClassic().parseText(
        new JsonBuilder(
            new JsonSlurper()
                .setType(JsonParserType.LAX)
                .parseText(jsonText)
        )
        .toString()
    )
}

def preparePackageJson() {
    def packageJsonTemplate = readFile env.WORKSPACE+"/package.json"

    println packageJsonTemplate

    packageJson = jsonSlurpLax(packageJsonTemplate)

    packageJson.version = "0.1." + env.BUILD_NUMBER

    def jsonPrepared = new JsonBuilder(packageJson).toPrettyString()

    println jsonPrepared
    writeFile(file:'package.json', text: jsonPrepared)
}

def getGitBranchName() {
    return scm.branches[0].name
}

pipeline{        
    agent any;
    stages {
        stage('prepare') {
            steps {
                slackSend color: "good", message: "Job ${BUILD_TAG} started."
                script {
                    System.setProperty("org.jenkinsci.plugins.durabletask.BourneShellScript.HEARTBEAT_CHECK_INTERVAL", "86400");
                }
                checkout([$class: 'GitSCM', branches: [[name:  'main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/ra11p0/formik-components.git']]])
            }
        }  
    
        stage('install dependencies'){
            steps {
                sh 'npm install;'
            }
        }

        stage('lint'){
            steps {
                sh 'npm run lint:code;'
            }
        }

        stage('prepare files') {
            steps {
                preparePackageJson()
                sh 'rm -f tsconfig.json'
                sh 'mv tsconfig.release.json tsconfig.json'
                sh "rm -fr ./dist || true"
                sh "mkdir dist"
            }
        }
        
        stage('build'){
            steps {
                sh 'npm run build;'
            }
        }
        
        stage('publish'){
            steps {
                sh 'npm publish --registry npm.ra11p0dev.ovh;'
            }
        }
    }
    post{
        success{
            setBuildStatus("Build succeeded", "SUCCESS");
            slackSend color: "good", message: "Job ${BUILD_TAG} build and deployed successfully."
        }
        failure{
            setBuildStatus("Build failed", "FAILURE");
            slackSend color: "danger", message: "Job ${BUILD_TAG} failed."
        }
    }
}