import { $ } from 'bun'
import { intro, select, text } from "@clack/prompts"

intro("migrate D1 database")

const db: string | symbol = await text({
    message: "Enter the database name: "
})

const env: string | symbol = await select({
    message: "choose an environment.",
    options: [
        { value: "local", label: "local" },
        { value: "remote", label: "remote" }
    ]
})

if (env === "local") {
    await $`bunx wrangler d1 migrations apply ${db} --${env} --persist-to ../../`
} else {
    await $`bunx wrangler d1 migrations apply ${db} --${env}`
}