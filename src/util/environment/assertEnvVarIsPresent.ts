export const assertEnvVarIsPresent = (variableName: string): void | never => {
    if (!process.env[variableName]) {
        console.error(`Missing environment variable: '${variableName}'`)
        process.exit(1)
    }
}
