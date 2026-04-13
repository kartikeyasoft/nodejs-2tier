const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✨ Magical default spells – Server Magic themed ✨
let todos = [
  { id: 1, text: "🐳 Learn Docker with KartikeyaSoft Cloud Lab", completed: false },
  { id: 2, text: "⚡ Cast your first server spell: nginx", completed: false },
  { id: 3, text: "📦 Build a custom server image for your app", completed: false },
  { id: 4, text: "🌐 Expose server ports with -p magic", completed: false },
  { id: 5, text: "🔁 Use docker-compose to orchestrate multi-server spells", completed: false }
];

app.get('/api/todos', (req, res) => {
  console.log(`✨ Fetching ${todos.length} magical spells`);
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Spell text required" });
  const newTodo = { id: todos.length + 1, text, completed: false };
  todos.push(newTodo);
  console.log(`✨ New spell added: "${text}" (id: ${newTodo.id})`);
  res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: "Spell not found" });
  todo.completed = !todo.completed;
  console.log(`⚡ Spell "${todo.text}" is now ${todo.completed ? "EXECUTED ✓" : "PENDING ▶"}`);
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Spell not found" });
  const removed = todos.splice(index, 1)[0];
  console.log(`🗑️ Spell removed: "${removed.text}"`);
  res.json({ message: "Spell banished", removed });
});

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════════╗
  ║   🧙 SERVER MAGIC INPUT HUB BACKEND 🧙               ║
  ║   KartikeyaSoft Cloud Lab - Real‑time Spell Engine  ║
  ║   API running on port ${PORT}                         ║
  ║   Test: curl http://localhost:${PORT}/api/todos       ║
  ╚══════════════════════════════════════════════════════╝
  `);
});
