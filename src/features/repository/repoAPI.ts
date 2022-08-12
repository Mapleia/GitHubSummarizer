import { Octokit } from 'octokit'

const octokit = new Octokit({
  userAgent: 'github-summarizer/v0.1.0',
  auth: process.env.REACT_APP_GITHUB_APP_KEY
})

export default octokit
