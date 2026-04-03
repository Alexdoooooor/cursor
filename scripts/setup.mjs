import { promises as fs } from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const envExamplePath = path.join(workspaceRoot, ".env.example");
const envPath = path.join(workspaceRoot, ".env.local");

async function ensureEnvFile() {
  try {
    await fs.access(envPath);
    console.log("Файл .env.local уже существует.");
  } catch {
    const example = await fs.readFile(envExamplePath, "utf8");
    await fs.writeFile(envPath, example, "utf8");
    console.log("Создан .env.local из .env.example.");
  }
}

async function main() {
  await ensureEnvFile();
  console.log("Базовая настройка завершена. При необходимости заполните переменные окружения.");
}

main().catch((error) => {
  console.error("Ошибка setup-скрипта:", error);
  process.exit(1);
});
