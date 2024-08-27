"use server";

// Instrumentation doesn't seem to be working well with sequelize.  Waiting for non-beta support
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // const AssistantSeed = await import('./app/lib/data/AssistantSeed')
    // await AssistantSeed()
  }
}
