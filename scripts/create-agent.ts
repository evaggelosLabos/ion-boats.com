import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env.production" });

import bcrypt from "bcryptjs";
import { connectMongoose } from "../lib/db/mongoose";
import { AgentModel } from "../lib/db/agentModels";

async function run() {
  await connectMongoose();

  const email = "agent1@ion-boats.com";
  const password = "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 10);

  const exists = await AgentModel.findOne({ email }).lean();
  if (exists) {
    console.log("Agent already exists:", email);
    process.exit(0);
  }

  await AgentModel.create({
    name: "Agent 1",
    email,
    passwordHash,
    isActive: true,
    createdAt: new Date(),
  });

  console.log("✅ Created agent:", email, "password:", password);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
