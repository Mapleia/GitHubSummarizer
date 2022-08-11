import { Octokit } from 'octokit'
import { createAppAuth } from '@octokit/auth-app'

const octokit = new Octokit({
  userAgent: 'sniptech_test/v0.1.0',
  authStrategy: createAppAuth,
  auth: { appId: 1, privateKey: process.env.GITHUB_APP_KEY }
})

export default octokit
