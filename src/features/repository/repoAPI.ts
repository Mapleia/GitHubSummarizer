import { Octokit } from 'octokit'

const octokit = new Octokit({
  userAgent: 'github-summarizer/v1.0.0',
  auth: process.env.REACT_APP_GITHUB_KEY
})

export default octokit
